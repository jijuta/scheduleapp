## 설치환경

<ul>
    <li>node.js 8+ 이상이 설치되어 있어야 합니다. </li>
    <li>mysql local 또는 remote 에 연결 가능해야 합니다. </li>
    <li>config/database.js 설정 파일에 mysql 접속 정보를 등록 해 주세요</li>
    <li>#mysql 관련 설정 tablename 은 각 환경에 맞게 변경 바랍니다.</li>
</ul>
    app.get('/smbrid', function(req, res){
      connection.query('SELECT * from tablename', function(err, rows) {
        if(err) throw err;

        console.log('rb_s_mbrid: ', rows);
        res.send(rows);
      });
    });

## INSTALL
<ul>
    <li>git clone https://github.com/jijuta/scheduleapp.git </li>
    <li>npm install </li>
    <li>npm start or node index.js</li>
    <li>http://localhost:3000</li>
</ul>

## WIKI
<ul>
    <li>TODO LIST https://github.com/jijuta/scheduleapp/wiki</li>
    <li>INSTALL  https://github.com/jijuta/scheduleapp/wiki/install</li>
    <li>DOCUMENT  https://github.com/jijuta/scheduleapp/wiki/doc</li>
</ul>


## OPEN SOURCE LIST
<ul>
    <li>node.js 8+</li>
    <li>express 4.14.0</li>
    <li>body-parser 1.15.0 </li>
    <li>tui-calendar http://ui.toast.com/tui-calendar</li>  
</ul>

## tui-calendar npm install
    $ npm install --save tui-calendar # Latest version
    $ npm install --save tui-calendar@<version> # Specific version
    
## tui-calendar cdn use
    <script src="https://uicdn.toast.com/tui.code-snippet/latest/tui-code-snippet.js"></script>
    <script src="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.js"></script>
    <link rel="stylesheet" type="text/css" href="https://uicdn.toast.com/tui-calendar/latest/tui-calendar.css" />
