/**
 * Возвращает промис который зарезолвится через нужное время
 */
export default (time: number): Promise<void>=> {
  return new Promise(res => setTimeout(res, time));
}
