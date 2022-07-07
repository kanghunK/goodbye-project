import 'dotenv/config';
import { app } from './app.js';

// .env 파일에 예를 들어 SERVER_PORT="3000" 을 작성하면, process.env.SERVER_PORT가 3000이 됨
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});