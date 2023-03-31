import * as TmImage from '@teachablemachine/image';

let inited = false;
let model: TmImage.CustomMobileNet | null = null;
export const init = async () => {
  if (inited) return;
  inited = true;
  const url = 'https://teachablemachine.withgoogle.com/models/Mh38a-XX0/';
  const modelUrl = url + 'model.json';
  const metadataUrl = url + 'metadata.json';
  model = await TmImage.load(modelUrl, metadataUrl);
};

export const predict = async (img: File) => {
  if (!model) {
    throw Error();
  }
  const image = await createImageBitmap(img);
  const prediction = await model.predict(image, false);
  console.log(JSON.stringify(prediction));
  let probability = 0;
  let result = '';
  let resIdx = 0;
  prediction.forEach((dt, i) => {
    if (probability < dt.probability) {
      result = dt.className;
      probability = dt.probability;
      resIdx = i;
    }
  });
  return { result, probability, resIdx };
};
