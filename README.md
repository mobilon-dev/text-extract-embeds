## @mobilon-dev/text-extract-embeds


`````javascript

const {analyzeEmbed} = require('@mobilon-dev/text-extract-embeds');

const input = [
  'YouTube: https://www.youtube.com/watch?v=dQw4w9WgXcQ ',
  'Vimeo: https://vimeo.com/123456789 ',
  'Rutube: https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/ ',
  'VK: https://vk.com/video-45256126_456242536',
].join('');

const result = analyzeEmbed(input);

console.log('e', JSON.stringify(result));

// [
//  {"type":"youtube","videoId":"dQw4w9WgXcQ","url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ","index":9},
//  {"type":"vimeo","videoId":"123456789","url":"https://vimeo.com/123456789","index":60},
//  {"type":"rutube","videoId":"b1c6f3a861e2e4f84179ba2f92521a57","url":"https://rutube.ru/video/b1c6f3a861e2e4f84179ba2f92521a57/","index":96},
//  {"type":"vk_video","videoId":"45256126_456242536","url":"https://vk.com/video-45256126_456242536","index":158}
// ]

`````