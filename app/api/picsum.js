import axios from "axios";

const baseURL = "https://picsum.photos/v2/list";

export default picsum = axios.create({
  baseURL,
});
