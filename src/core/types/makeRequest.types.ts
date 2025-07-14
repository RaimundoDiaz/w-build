export class AppResponse<T> extends Response {
  constructor(response: Response) {
    super(response.body, response);
  }

  /**
   * @raises SyntaxError If the response body is not a valid JSON.
   */
  public async json(): Promise<T> {
    const jsonResponse = await super.json();

    return jsonResponse as T;
  }
}
