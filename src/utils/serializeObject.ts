const serializeObject = <T>(objetData: T):T => {
  if (objetData instanceof Date) {
    return objetData.toString() as unknown as T;
  }
  if (typeof objetData === 'object' && objetData !== null) {
    const nuevoObjeto: any = {};
    for (const key in objetData) {
      if (Object.prototype.hasOwnProperty.call(objetData, key)) {
        nuevoObjeto[key] = serializeObject(objetData[key]);
      }
    }
    return nuevoObjeto as T;
  }
  return objetData;
}

export default serializeObject
