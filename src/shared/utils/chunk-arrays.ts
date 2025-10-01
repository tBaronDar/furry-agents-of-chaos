//to avoid problems with ids not being unique
export const chunkArray = <T>(array: Array<T>, chunkSize: number): Array<Array<T>> => {
  const chunks: Array<Array<T>> = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
