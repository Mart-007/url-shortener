import { IShortenURLParams } from "../interface/shorten-url";
import axios from "axios";

class ShortenURLService {
  private URL: string;
  private AUTHORIZATION: string;
  constructor() {
    this.URL = "http://localhost:8000";
    this.AUTHORIZATION = "123"; //should be in env
  }

  async create(data: IShortenURLParams) {
    try {
      const response = await axios({
        method: "POST",
        url: `${this.URL}/create`,
        headers: {
          "Content-type": "application/json",
          authorization: this.AUTHORIZATION,
        },
        data,
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async get(shortCode: string) {
    try {
      const response = await axios({
        method: "GET",
        url: `${this.URL}/${shortCode}`,
        headers: {
          "Content-type": "application/json",
          authorization: this.AUTHORIZATION,
        },
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default ShortenURLService;
