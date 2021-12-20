class Valid {
  public static isJSON(s: string) : boolean {
    try {
      JSON.parse(s);
    } catch (e) {
      return false;
    }
    return true;
  }
}
export { Valid };