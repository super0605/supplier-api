import { Injectable, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { readFile } from 'fs';

import { SpellCheckResultType } from './spell-check.interface';

@Injectable()
export class SpellCheckService {
  async spellCheck(word: string): Promise<SpellCheckResultType> {
    const contents: any = await this.readFile('dictionary.txt');
    const dictionary = contents.split(/\r?\n/) || [];

    const isUppercase = this.validateUppercase(word);
    const isCapitalOfFirst = this.startsWithCapital(word);
    let result = dictionary.filter((t: string) => t === word.toLowerCase());
    let correctness = false;
    let suggestions = [];

    if (result.length === 0) {
      const errors = { word: 'This word is invalid.' };
      throw new HttpException(
        { message: 'Not Found', errors },
        HttpStatus.NOT_FOUND,
      );
    }

    if (!!isUppercase || !!isCapitalOfFirst) {
      correctness = result.length > 0;
    } else {
      result = dictionary.filter((t: string) => t === word);
      correctness = result.length > 0;
    }

    if (!correctness) {
      suggestions = dictionary.filter((t: string) =>
        t.startsWith(word.toLowerCase()),
      );
    }

    return { suggestions: suggestions, correct: correctness };
  }

  async readFile(path: string) {
    return new Promise((resolve, reject) => {
      readFile(path, 'utf8', function (err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  startsWithCapital(str: string) {
    const isCapitalOfFirst = str.charAt(0) === str.charAt(0).toUpperCase();
    const isLowercaseOfRest =
      str.substring(1) === str.substring(1).toLowerCase();
    return !!isCapitalOfFirst && !!isLowercaseOfRest;
  }

  validateUppercase(str: string) {
    if (str == str.toUpperCase()) {
      return true;
    }
    return false;
  }

  validateLowercase(str: string) {
    if (str == str.toLowerCase()) {
      return true;
    }
    return false;
  }
}
