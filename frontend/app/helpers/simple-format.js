import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function simpleFormat(input/*, hash*/) {
  if (input) {
    let str = input;
    if (str[0]) {
      str = str[0].replace(/\r\n?/, "\n");
      if (str.length > 0) {
        str = str.replace(/\n\n+/g, '</p><p>');
        str = str.replace(/\n/g, '<br />');
        str = '<p>' + str + '</p>';
      }
      return htmlSafe(str);
    }
  }
  return "";
}

export default helper(simpleFormat);
