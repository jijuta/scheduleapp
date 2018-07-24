## Overview
각 회원들의 개인 일정을 설정하는 페이지입니다. 일정 관리에 필요한 기본적인 기능들이 포함되어 있습니다.
<ul>
    <li>일정 생성, 조회, 수정, 삭제를 통하여 자신의 일정을 관리하고 다른사람의 일정을 조회해볼 수 있습니다.</li>
    <li>로그인한 사람에 한해서만 페이지에 접근할 수 있게 구현하였습니다.</li>
    <li>다른사람의 정보에 접근할 수 없도록 프론트단과 백엔드 단에서 벨리데이션 체크를 하여 잘못된 접근을 방지하였습니다.</li>
</ul>

## 풀캘린더
풀캘린더 화면과 데이터 파싱을 사용하는 페이지들은 모두 한 스크립트와 jsp를 사용하였습니다.
<ul>
    <li>jsp 페이지를 인클루딩 해오는 방식으로 하나의 풀캘린더를 구현 후 인클루딩하여 여러 페이지에서 사용하였습니다</li>
    <li>main.js 파일에 풀캘린더 div에 데이터를 파싱해주는 메서드를 정의하여 사용하였습니다.</li>
</ul>

## 댓글
댓글과 대댓글을 등록하고 목록을 보여주는 화면을 일정 상세정보 창에 보여준다.
<ul>
    <li>댓글과 대댓글 조회, 등록, 수정, 삭제를 할 수 있고 댓글과 대댓글은 depth 칼럼으로 구분한다.</li>
    <li>대댓글에는 답글을 달 수 없게 하였다.</li>
    <li>삭제와 수정의 경우에는 글쓴이와 로그인한 사용자의 정보가 일치할 경우에만 수정 삭제 버튼이 보이고 컨트롤러에서 사용자와 글쓴이의 일치관계를 한번 더 재확인한다.</li>
</ul>

    // 세션에 저장된 사용자의 pk
    int sessionMember = Integer.parseInt(session.getAttribute("member").toString());
    // 파라미터로 넘어온 글쓴이의 pk
    int memberNo = Integer.parseInt(requestParam.get("memberNo").toString());
    // 사용자와 글쓴이의 pk가 일치하지 않을경우
    if (sessionMember != memberNo) throw new NullPointerException("잘못된 접근입니다.");


    /*
    * 댓글 조회 쿼리문
    * GROUP_NO = 댓글의 순서이다 GROUP_NO가 같은 수일 경우 하나의 댓글과 하나 이상의 대댓글이다.
    * DEPTH = 0이면 댓글 1이면 대댓글이다.
    */
    <select id="replyList" parameterType="int" resultType="hashMap">
	  	select SEQ, m.NAME, SAMPLE_SEQ, COMMENT, CRE_DATE, DEPTH, PARENT_REPLYS_NO, GROUP_NO, MEMBER_NO
	  	from REPLYS as r
	  	left join MEMBER as m
	  	on r.MEMBER_NO = m.NO
	  	where SAMPLE_SEQ = #{seq, jdbcType=INTEGER}
	  	and DELETE_AT = 'N'
	  	order by GROUP_NO, DEPTH
	</select>

    /*
    * 댓글일 경우와 대댓글일 경우 댓글 등록시 등록해야 하는 값이 다르므로 depth의 값에따라 다른 쿼리문을 처리한다.
    */
    <insert id="addReply" parameterType="hashMap">
		insert into REPLYS(MEMBER_NO, SAMPLE_SEQ, COMMENT, CRE_DATE, DEPTH, PARENT_REPLYS_NO, GROUP_NO, DELETE_AT)
		<choose>
			<when test="depth == 0">
				values (#{memberNo}, #{sample_seq}, #{comment}, now(), #{depth}, null, (select ifnull(max(r.GROUP_NO),0) +1 from REPLYS as r), 'N')
			</when>
			<otherwise>
				values (#{memberNo}, #{sample_seq}, #{comment}, now(), #{depth}, #{parentNo}, #{groupNo}, 'N')
			</otherwise>
		</choose>
	</insert>

## 회원가입
회원가입시 해야하는 기본적인 벨리데이션 체크를 하였습니다.
<ul>
    <li>이메일, 이름, 비밀번호, 비밀번호 확인, 성별, 부서, 직급 정보를 입력받고 해당 데이터가 입력되지 않았을 경우 해당 태그에 포커싱되게 하고 회원가입이 되지 않게 하였습니다.</li>
    <li>이메일은 ex) sattlub123@gmail.com 처럼 @ 앞에 아이디 뒤에 메일주소를 입력하지 않으면 회원가입이 되지 않도록 하였습니다.</li>
    <li>회원정보 등록시 db에서 이메일의 중복 여부를 체크하여 중복되어있을 경우 중복된 이메일이라는 경고창과 함께 회원가입이 되지 않도록 하였습니다.</li>
    <li>이름은 2~10글자 이내로 한글 및 영문만 입력하게 하였습니다.</li>
    <li>비밀번호와 비밀번호 확인은 영문+숫자+특수문자 조합으로 8~16이내의 정보를 입력하지 않거나 둘의 값이 다를 경우 회원가입이 되지 않도록 하였습니다.</li>
</ul>

## 로그인
이메일과 비밀번호 조회결과를 체크합니다.
<ul>
    <li>아이디, 비밀번호를 입력하였는지 공백여부를 체크합니다.</li>
    <li>로그인 정보가 db정보와 일치하지 않는다면 아이디가 틀렸는지 비밀번호가 틀렸는지의 경우를 따로 알려줍니다.</li>
    <li>로그인을 하지 않을경우 로그인 페이지와 회원가입 페이지 이외의 서비스를 이용할 수 없게 하였습니다.</li>
</ul>


## 일정 목록
등록된 일정들을 조회설정대로 검색하여 조회 결과를 보여줍니다.
<ul>
    <li>화면에서 설정한 타입별로 데이터를 조회하도록 마이바티스에서 쿼리를 정의하였습니다.</li>
</ul>


  ## 일정 등록
  자신의 일정에 관한 정보들을 입력받습니다.
  <ul>
    <li>일정명, 내용, 일정 종류, 시작일, 종료일, 일정을 같이하는 멤버를 등록합니다.</li>
    <li>정보 입력이 누락될 경우를 대비하여 일정을 같이하는 멤버의 정보 이외의 정보들은 공백일 경우 일정등록을 못하게 하였습니다.</li>
  </ul>


## 일정 정보를 수정하고 일정등록 조건과 같은 벨리데이션 체크를 한다.
<ul>
    <li>일정에 관한 데이터를 받아올 때 초기 멤버배열, 추가 멤버배열, 삭제 멤버배열을 생성하여 기존에 등록되있던 회원 이외의 추가 멤버들만 데이터 테이블에 추가한다.</li>
</ul>


## 일정 상세정보
일정 정보를 보여준다

<ul>
    <li>일정 기간과 일정명을 달력에 표출하고 클릭할 경우 상세 데이터를 나타낸다.</li>
    <li>자기 자신의 일정일 경우에만 수정페이지로 이동하는 버튼과 삭제버튼을 보여준다</li>
</ul>

## 일정 삭제
일정 pk를 서버에 전달하여 데이터를 삭제한다

<ul>
    <li>일정 데이터의 pk와 등록자 pk를 서버에 전송하여 컨트롤러에서 현재 로그인중인 멤버의 pk와 비교하여 일치할 경우에만 삭제를 한다</li>
    <li>데이터를 삭제시키는게 아닌 일정 테이블의 DELETE_AT 컬럼을 'Y'값으로 변경한다.</li>
</ul>

    

## 캘린더 메뉴
사이드바에서 캘린더 메뉴로 들어가면 모든 일정 조회를 캘린더 화면으로 받아볼 수 있다
<ul>
    <li>일정 목록 조회조건이랑 똑같으며 일정 데이터를 달력 화면에서 조회해서 볼 수 있다.</li>
</ul>


## 내 일정
내 일정만 조회해서 화면에 달력형태로 데이터를 보여준다
<ul>
    <li>내가 등록한 일정이랑 타인의 일정중 내가 참여하는 일정 데이터를 달력화면으로 보여준다</li>
</ul>
