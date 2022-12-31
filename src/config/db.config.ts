import * as fs from "fs";
import path from "path";

export class MysqlConfig {
	readonly type = 'mysql'

	readonly host = 'portgas.mysql.database.azure.com'

	readonly port = 3306

	readonly username = 'portgas'

	readonly password = process.env.DB_PASS

	readonly database = 'authguardian_db'

	readonly ssl = { ca: fs.readFileSync(path.join('DigiCertGlobalRootCA.crt.pem')) };

	entities = []

	synchronize = false

	logging = false
}
