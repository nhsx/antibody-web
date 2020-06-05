// Make our test.env variables available

import { resolve } from 'path';

require('dotenv').config({ path: resolve(__dirname,"./test.env") });