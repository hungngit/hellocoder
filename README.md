// Run MongoDB Server
1. Copy external_files/mongod.conf to <your mongodb folder>/../bin
2. Open new CMD Console
3. CD to <your mongodb folder>/../bin
4. run CMD : mongod -f mongod.conf

// Run HelloCoder App
1. Open new CMD Console
2. CD to root folder of repo (default : hellocoder)
3. Run CMD : npm install&&node app

app 		 // application folder
-- bin  	 // file to run app
-- client 	 // Web UI
   -- admin  // admin pages
   -- assets // doc, files,...
   -- lib 	 // third-party lib
   -- shared // 
   -- theme	 // site template
   -- web	 // user pages
-- models 	 // domain models
-- routes	 // routing objects
-- services	 // services
config		 // configs
documents	 // system documents
sql 		 // sql files
test		 // unit tests
uploads		 // upload files
index.js	 // start file of app
package.json // package.json
README.md
