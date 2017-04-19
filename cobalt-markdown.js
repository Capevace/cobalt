const fs = require('fs');
const trimOffNewlines = require('trim-off-newlines');

/**
 * Parse a COMD string.
 * @param  {String} content The content to be parsed.
 * @return {Object}         The parsed content {meta, content}
 */
function parseCobaltMarkdown(content) {
  // Match the COMD meta separator (\n---\n)
  const matchSeparator = content.match(/\n---\n/);
  if (matchSeparator) {
    // If a match is found interpret the part above the separator as
    // the meta part (in JSON) and the bottom part as the content.
    const metaPart = content.slice(0, matchSeparator.index);
    const contentPart = content.slice(matchSeparator.index + 5, content.length);

    // Try parsing the supplied JSON.
    //
    try {
      const metaData = JSON.parse(metaPart);

      // If the parsing succeeds resolve the promise with the result object.
      // That object includes the meta and the content of the file.
      return {
        meta: metaData,
        content: trimOffNewlines(contentPart)
      };
    } catch (e) {
      throw new Error(
        `The meta part in the COMD content is not valid.\n${content}`
      );
    }
  }

  throw new Error(`The COMD content is not valid.\n${content}`);
}

/**
 * Generates a valid COMD string. The readable flag enables easier editing in file.
 * @param  {Object}  meta             The meta to be put into the markdown.
 * @param  {String}  [content='']     The content of the markdown file.
 * @param  {Boolean} [readable=false] Wether the returned string should be formatted with newlines and spaces or not.
 * @return {String}                   The resulting COMD string.
 */
function generateCobaltMarkdown(meta, content = '', readable = false) {
  if (!meta) throw new Error('No COMD meta supplied.');

  try {
    const metaJson = readable
      ? JSON.stringify(meta, null, 2)
      : JSON.stringify(meta);

    return `${metaJson}\n---\n${readable ? '\n' : ''}${content}${readable ? '\n' : ''}`;
  } catch (e) {
    throw new Error('The supplied COMD meta could not be parsed.');
  }
}

module.exports = {
  parseCobaltMarkdown,
  generateCobaltMarkdown
};
