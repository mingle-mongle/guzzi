[✔]: ./image/checkbox-small-blue.png

# GUZZI ROOM PROJECT

<img src="./image/guzzi.gif">

<br/>

## 목차

1. [프로젝트 설명](#1-프로젝트-설명)
2. [기술 스택](#2-기술-스택-technique-used)
3. [아키텍처 및 시퀀스 다이어그램](#3-아키텍처-및-시퀀스-다이어그램)
4. [DB 구성](#4-db-구성)
5. [API 명세](#5-api-명세)
6. [성능 테스트](#6-성능-테스트)
7. [트러블 슈팅](#7-트러블-슈팅)

<br/><br/>

# `1. 프로젝트 설명`

## 프로젝트 설명

**GUZZI**는 소비로서 마음을 채우는게 아니라 절약으로서 나 스스로를 명품으로 만들자 라는 의미로 만들어졌습니다. <br/>
최근 경기악화와 물가상승, 금리 인상 등으로 으로 인해 생활비를 절약하자는 분위기가 생성되고 있습니다. <br/>
혼자서는 소비를 절제하기 힘들지만 함께 절약함으로써 동기부여도 되고, 절약을 즐겁게 만들고 싶어 제작하게 되었습니다.

</br>

## 프로젝트 링크

최종 배포 링크 : [GUZZI-ROOM](https://all-chat.netlify.app/guzzi) </br>
백엔드 Repo 링크 : https://github.com/mingle-mongle/guzzi </br>
프론트엔드 Repo 링크 : https://github.com/HyeyonJ/room-of-GUZZI </br>

</br>

## Directory Structure

```
📂 backend
    📂 guzzi
    ├── 📂 controller
    |   └── 📄 list.js
    ├── 📂 data
    |   └── 📄 list.js
    ├── 📂 db
    |   └── 📄 database.js
    ├── 📂 router
    |   └── 📄 lists.js
    ├── 📂 schema
    |   ├── 📄 list.js
    |   └── 📄 validate.js
    ├── 📄 swagger.js
    ├── 📄 server.js
    ├── 📄 app.js
    ├── 📄 package.json
    ├── 📄 README.md
    └── 📄 .prettierrc.json
```

<br/><br/>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>

# `2. 기술 스택 (Technique Used)`

## Language

| <img alt="javascript" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/140px-Unofficial_JavaScript_logo_2.svg.png" height=100> |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                      [Javascript](https://developer.mozilla.org/ko/docs/Web/JavaScript)                                                       |

## Server Management Tools

| <img alt="nodemon" src="https://user-images.githubusercontent.com/13700/35731649-652807e8-080e-11e8-88fd-1b2f6d553b2d.png" height=100> |
| :------------------------------------------------------------------------------------------------------------------------------------: |
|                                               [nodemon](https://github.com/remy/nodemon)                                               |

## Server(back-end)

| <img alt="nodejs" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/220px-Node.js_logo.svg.png" height=100> | <img alt="express" src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" height=100> |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
|                                                 [Nodejs v16.17.0](https://nodejs.org/ko/)                                                 |                               [Express v4.18](https://expressjs.com/ko/)                               |

## Database

| <img src="https://i.namu.wiki/i/lKYgsxax0w1O9u-Vt6thK_IdIv3MRGGXQJGA6SjkF5dORNfkV9QQlJ909916bhWWetwRhgiaBYvljSYG2v4YdC5xJ0vqzQkjdZOZMQD43avXpgVPJEblz85mXwblsJCiLnhBXoKMwTUypMxzbTkaVg.svg" height=100> |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                     [MySQL](https://www.mysql.com/)                                                                                     |

</br>

## 사용된 오픈소스(Used Open Source)

- backend
  - [ajv](https://github.com/ajv-validator/ajv)
  - [cors](https://github.com/expressjs/cors)
  - [dotenv](https://github.com/motdotla/dotenv)
  - [helmet](https://github.com/helmetjs/helmet)
  - [morgan](https://github.com/expressjs/morgan)
  - [uuid](https://github.com/uuidjs/uuid)
  - [jsdoc](https://github.com/jsdoc/jsdoc)
  - [prettier](https://github.com/prettier/prettier)
  - [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
  - [swagger-ui](https://github.com/swagger-api/swagger-ui)

<br/></br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>

# `3. 아키텍처 및 시퀀스 다이어그램`

<details open="open">
  <ul>
  <li> ᐅ 아키텍처 </li>
	<table align="center">
		<tr>
			<td align="center"><b>3-Tier Architecture</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/archi.png">
			</td>
		</tr>
		<tr>
			<td align="center">
				Client : REACT </br>
        Server : Aws App Runner(Express) </br>
        Database : PlanetScale(MySQL) </br>
			</td>
		</tr>
	</table>
    <li> ᐅ GET </li>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 리스트 페이지별 요청</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/getPage.png">
			</td>
		</tr>
		<tr>
			<td align="center">
				페이지 Validation check를 한 후, 올바른 요청일 경우 DB에 SELECT 쿼리를 넘깁니다. </br>
        받아온 데이터에 이상이 있을 수 있으니, 데이터도 Validation check를 해줍니다. </br>
        정확한 데이터일 경우 200 OK 응답코드와 데이터를 보내줍니다.        
			</td>
		</tr>
	</table>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 리스트 메시지 아이디별 요청</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/getMsgid.png">
			</td>
		</tr>
		<tr>
			<td align="center">
				메세지 아이디를 Validation check를 한 후, 올바른 요청일 경우 DB에 SELECT 쿼리를 넘깁니다. </br>
        받아온 데이터에 이상이 있을 수 있으니, 데이터도 Validation check를 해줍니다. </br>
        정확한 데이터일 경우 200 OK 응답코드와 데이터를 보내줍니다.
			</td>
		</tr>
	</table>
    <li> ᐅ POST  </li>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 메시지 추가</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/post.png">
			</td>
		</tr>
		<tr>
			<td align="center">
			  body값에 대한 Validation check를 한 후, 올바른 요청일 경우 DB에 INSERT 쿼리를 넘깁니다. </br>
        DB에 INSERT 성공 시 201 Created 응답코드를 보내줍니다. 
			</td>
		</tr>
	</table>
	    <li> ᐅ PUT </li>
	<table align="center">
		<tr>
			<td align="center"><b>채팅 메시지 수정</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/put.png">
			</td>
		</tr>
		<tr>
			<td align="center">
				메세지 아이디와 body값에 대한 Validation check를 한 후, 올바른 요청일 경우 DB에 UPDATE 쿼리를 넘깁니다. </br>
        DB에 UPDATE 성공 시 204 No Content 응답코드를 보내줍니다. 
			</td>
		</tr>
	</table>
	    <li> ᐅ DELETE </li>
    	<table align="center">
		<tr>
			<td align="center"><b>채팅 메시지 삭제</b></td>
		</tr>
		<tr>
			<td align="center">
				<img src="./image/delete.png">
			</td>
		</tr>
		<tr>
			<td align="center">
			  메세지 아이디를 Validation check를 한 후, 올바른 요청일 경우 DB에 DELETE 쿼리를 넘깁니다. </br>
        DB에서 DELETE 성공 시 204 No Content 응답코드를 보내줍니다. 
			</td>
		</tr>
	</table>
	
  </ul>
</details>

<br/>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>

# `4. DB 구성`

## data Table Schema

채팅 메세지에 관련된 정보를 저장합니다.

|  Field  |     Type     | Null |     Key     |        Default         |                     Extra                     |
| :-----: | :----------: | :--: | :---------: | :--------------------: | :-------------------------------------------: |
| msg_id  |  BINARY(16)  |  NO  | PRIMARY KEY | UUID_TO_BIN(UUID(), 1) |               DEFAULT_GENERATED               |
| content |     TEXT     |  NO  |     YES     |                        |                                               |
|  type   | VARCHAR(255) | YES  |             |                        |                                               |
|  time   |  BIGINT(20)  | YES  |             |                        |                                               |
|  image  |     TEXT     | YES  |             |                        |                                               |
| created |  TIMESTAMP   |  NO  |             |   CURRENT_TIMESTAMP    |               DEFAULT_GENERATED               |
| updated |  TIMESTAMP   | YES  |             |   CURRENT_TIMESTAMP    | DEFAULT_GENERATED ON UPDATE CURRENT TIMESTAMP |
|  user   |     JSON     | YES  |             |                        |                                               |
| version | VARCHAR(255) | YES  |             |                        |                                               |

<br/>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>

# `5. API 명세`

## 5.1. Swagger

<img src="./image/swagger.png"/>

🔗 [**Swagger Link : API 테스트 가능**](https://aabnh8if56.ap-northeast-1.awsapprunner.com/api-docs/)

<br/>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>

# `6. 성능 테스트`

## Postman Api Test

<img src="./image/responseTime.png"/>

| 요청  | 총 요청 수 | 초당 요청 수 | 평균 응답 시간 | 최소 응답 시간 | 최대 응답 시간 | Error % |
| ----- | ---------- | ------------ | -------------- | -------------- | -------------- | ------- |
| POST  | 16,708     | 27.53        | 309 ms         | 62 ms          | 1,951 ms       | 0       |
| GET   | 16,701     | 27.52        | 504 ms         | 165 ms         | 4,114 ms       | 0       |
| TOTAL | 33,409     | 55.05        | 407 ms         |                |                | 0       |

- 50명의 가상 사용자가 10분간 동시에 실행하는 것을 기준으로 테스트 해보았습니다.
- POST 요청 시 서버의 평균 응답 속도는 309 ms 이고, 최대 응답 속도는 1,951 ms로 측정되었습니다.
- GET 요청 시 서버의 평균 응답 속도는 504 ms 이고, 최대 응답 속도는 4,114 ms 로 측정되었습니다.
- 1초당 55.05개의 요청을 처리했다는 결과를 확인할 수 있었습니다.

<br/>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>

# `7. 트러블 슈팅`

## 트러블 슈팅 목차

7.1. [PlanetScale 외래키 적용 불가능](#planetscale-외래키-적용-불가능) </br>
7.2. [UUID_TO_BIN swap flag](#uuid_to_bin-swap-flag) </br>
7.3. [DB Buffer Memory](#db-buffer-memory) </br>

</br>

## PlanetScale 외래키 적용 불가능

**핵심요약** </br>

> PlanetScale에서 외래키 생성이 불가능하여 mysql의 `JSON type`을 활용하여 user 컬럼을 생성했습니다.</br>

### **1. 문제 정의**

```sql
VT10001: foreign key constraints are not allowed
```

- 문제
  - PlanetScale 테이블 생성 시 외래키 생성 불가
- 문제 발생 원인
  - PlanetScale은 외래키 제약조건을 지원하지 않음.

</br>

### **2. 문제 해결 과정**

**2.1. user table 생성 후 JOIN 쿼리**

```sql
CREATE TABLE `user` (
	`ip` VARCHAR(255) NOT NULL,
	`role` VARCHAR(255) NOT NULL,
	`uuid` VARCHAR(255) NOT NULL,
	`device_id` TEXT NOT NULL,
	PRIMARY KEY(`uuid`)
);
```

- user table을 추가로 생성합니다.
- SELECT 쿼리 요청 시 data 테이블과 user 테이블을 JOIN 하여 검색합니다.
- SELECT 쿼리 요청 시 user의 정보는 항상 필요하고, 매 요청 시 JOIN을 하면 요청시간이 늘어나기 때문에 좋지 않다고 생각했습니다.

**2.2. JSON dataType 사용 (최종 해결 방법)** ✅

```json
{
  "ip": "123.214.255.142",
  "role": "user",
  "uuid": "071130fe-0ebe-45de-909a-ef73fa923c11",
  "device_id": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
}
```

- user table을 따로 생성하지 않고 data table에 user 컬럼을 추가했습니다.
- user 컬럼을 JSON type으로 설정하여 유저의 정보를 담을 수 있게끔 설정했습니다.
- user 객체 안에는 “ip”, “role”, “uuid”, “device_id”가 추가됩니다.
- SELECT 쿼리 요청 시 JOIN 을 할 필요 없이, 바로 user 정보를 가져올 수 있기 때문에 JSON을 사용하는 방법이 더 효율적이라고 생각했습니다.

</br>

### **3. 문제 해결 결과**

- 외래키를 생성하지 않고 JSON type을 활용해 user 컬럼을 생성했습니다.
- 외래키를 사용하는 것이 이상적인 설계이지만, 외래키가 지원되지 않는 상황이라면 JSON type을 활용하는 방법도 좋은 방법이라고 생각합니다.

</br>

### **4. 참고 자료 및 링크**

- [https://planetscale.com/docs/learn/operating-without-foreign-key-constraints](https://planetscale.com/docs/learn/operating-without-foreign-key-constraints)

</br>

<p align="right"><a href="#트러블-슈팅-목차">⬆ 트러블슈팅 목차로 돌아가기</a></p>

</br></br>

## UUID_TO_BIN Swap Flag

**핵심요약** </br>

> `UUID_TO_BIN()` 의 swap_flag를 1로 사용하고, 그 값을 그대로 가져오고 싶다면 `BIN_TO_UUID()`의 swap_flag는 0을 사용해야 합니다.</br>

### **1. 문제 정의**

- 문제
  - UUID_TO_BIN() 과 BIN_TO_UUID()의 swap_flag에 따라 받아와지는 결과값이 차이가 남.
- 문제 발생 원인
  - swap_flag 설정을 둘 다 같은 값으로 설정했음.

</br>

### **2. 문제 해결 과정**

**2.1. 직접 데이터를 넣어 테스트 해보기** ✅

```sql
DEFAULT 값이 (UUID_TO_BIN(UUID(), 0)) 일 경우
생성된 uuid(BINARY) >> "0x230ab26950fc11eeaf0adae9cf8f8644"

DEFAULT 값이 (UUID_TO_BIN(UUID(), 1)) 일 경우
생성된 uuid(BINARY) >> "0x11ee50fc0f6ca9eeaf0adae9cf8f8644"
```

```sql
<< DEFAULT (UUID_TO_BIN(UUID(), 1)) >>

SELECT BIN_TO_UUID(uuid, 0) FROM data;
결과값(STRING) >> "11ee50fc-0f6c-a9ee-af0a-dae9cf8f8644"

SELECT BIN_TO_UUID(uuid, 1) FROM data;
결과값(STRING) >> "0f6ca9ee-50fc-11ee-af0a-dae9cf8f8644"
```

- UUID_TO_BIN() 함수는 생성된 UUID 를 binary 로 convert 해주는 함수 입니다.
  - swap_flag 가 0 : 기본 UUID 문자열과 동일하게 담깁니다.
  - swap_flag 가 1 : 16진수의 첫 번째 및 세 번째 그룹을 교환하여 더 빠르게 변하는 부분을 오른쪽으로 이동시켜 시간순 정렬화가 된 데이터로 담깁니다.
- **data 테이블의 DEFAULT 값으로 생성되는 UUID_TO_BIN()의 swap_flag는 1로 설정했습니다.**
- BIN_TO_UUID(uuid, 0) 일 경우, 시간순 정렬화된 상태 그대로 STRING으로 변환시켜 줍니다.
- BIN_TO_UUID(uuid, 1) 일 경우, 시간순 정렬화된 상태를 다시 재배치하여 STRING으로 변환시켜 줍니다.
- **제가 원하는 값은 시간순 정렬화된 값이기 때문에 BIN_TO_UUID()의 swap_flag는 0으로 설정했습니다.**

</br>

### **3. 문제 해결 결과**

<img src="./image/uuidV1.png"/>

- UUID(Universally Unique Identifier)는 공개 소프트웨어 재단(OSF)에서 만든 고유성이 보장되는 표준 규약입니다.
- MySQL 8버전부터 `UUID()` 생성 시 자동으로 UUID V1을 사용합니다.
- UUID V1은 TIMESTAMP와 MAC 주소를 기반으로 생성됩니다.
- `UUID_TO_BIN()` 의 swap_flag를 1로 사용하고, 그 값을 그대로 가져오고 싶다면 `BIN_TO_UUID()`의 swap_flag는 0을 사용해야 합니다.

</br>

### **4. 참고 자료 및 링크**

- [https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html](https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html)
- [https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html#function_uuid](https://dev.mysql.com/doc/refman/8.0/en/miscellaneous-functions.html#function_uuid)

</br>

<p align="right"><a href="#트러블-슈팅-목차">⬆ 트러블슈팅 목차로 돌아가기</a></p>

</br></br>

## DB Buffer Memory

**핵심요약** </br>

> Sort Buffer Memory 부족을 해결하기 위해 인덱스를 사용했습니다.</br>

**그렇게 하지 않을 경우** </br>

> 데이터가 262KB(이미지 25개)이상 들어간 후 `ORDER BY` 쿼리를 사용하면 `out of sort memory (errno 1038)`가 발생합니다. </br>

### **1. 문제 정의**

```sql
{
    "error": "Error: target: chatting.-.primary: vttablet: rpc error:
      code = ResourceExhausted desc = Out of sort memory,
      consider increasing server sort buffer size (errno 1038) (sqlstate HY001):,
      BindVars: {REDACTED}"
}
```

```sql
SELECT BIN_TO_UUID AS msg_id
     , content
     , type
     , time
     , image
     , created
     , updated
     , user
     , version
  FROM data
 ORDER
    BY created DESC
 LIMIT 20
OFFSET 0;
```

- 문제
  - ORDER BY 사용시 sort_buffer_size 부족으로 데이터를 가져올 수 없음.
- 문제 발생 원인
  - 쿼리 실행에 필요한 버퍼 크기가 MySQL 서버에 구성된 sort_buffer_size 값보다 큼.
  - 기본 sort_buffer_size = 262144byte (262KB)
  - image 컬럼의 데이터타입은 TEXT로 1개 당 최대 50KB 입니다.
  - 25개 이상부터 데이터를 sorting 하려하면 문제가 발생했습니다.

</br>

### **2. 문제 해결 과정**

**2.1. Buffer Size 늘리기**

```sql
SET sort_buffer_size = 2097152;
```

- sort_buffer_size를 늘리더라도 메모리 부족 현상을 겪을 수 있습니다.
- 메모리 부족 현상이 일어나면 MySQL의 프로세스가 강제로 종료될 수 있습니다.
- 버퍼 사이즈를 늘리는 방법은 근본적인 해결 방법이 아니라고 생각했습니다.

**2.2. 서브쿼리 사용**

```sql
SELECT BIN_TO_UUID AS msg_id
     , content
     , type
     , time
     , image
     , created
     , updated
     , user
     , version
  FROM (
        SELECT *
          FROM data
         ORDER
            BY msg_id DESC
       ) AS Data
 LIMIT 20
OFFSET 0;
```

- 서브쿼리에서 “ORDER BY”를 사용하여 임시 테이블에서 sorting 작업이 이루어집니다.
- 현재 상황에서 buffer 메모리 부족은 일어나지 않지만 “ORDER BY”를 사용하기 때문에 추후에 메모리 부족 문제가 발생할 수 있습니다.
- Backward Index Scan은 Forward Index Scan 보다 느립니다.

**2.3. 쿼리 2번 요청**

```sql
SELECT COUNT(*) FROM data;
```

```sql
SELECT BIN_TO_UUID AS msg_id
     , content
     , type
     , time
     , image
     , created
     , updated
     , user
     , version
  FROM data
 LIMIT 20
OFFSET (총 row - 20);
```

- 총 row수를 먼저 가져온 후, OFFSET에 반영.
- 평균 처리 속도 : 1,019ms

**2.4. 인덱스 설정 후 커서 페이지네이션 (최종 해결 방법)** ✅

```sql
SELECT BIN_TO_UUID AS msg_id
     , content
     , type
     , time
     , image
     , created
     , updated
     , user
     , version
  FROM data
 WHERE time >= (
                SELECT
                       time
                  FROM data
                 LIMIT 1
                OFFSET 20
                )
 LIMIT 20
OFFSET 0;
```

- time 컬럼에 Descending Index를 추가하여, ORDER BY 없이도 DESC 정렬이 되게끔 했습니다.
- time의 20번째 값을 기준으로 가져와 커서값으로 설정한 후 데이터를 가져옵니다.
- Forward Index Scan으로 진행되기 때문에 속도가 더 빠릅니다.
- 평균 처리 속도 : 573ms

</br>

### **3. 문제 해결 결과**

<img src="./image/graph.png">

| 방법             | 총 요청 수 | 초당 요청 수 | 평균 응답 시간 | 최소 응답 시간 | 최대 응답 시간 | Error % |
| ---------------- | ---------- | ------------ | -------------- | -------------- | -------------- | ------- |
| DESC 인덱스 사용 | 11,669     | 19.28        | 573 ms         | 196 ms         | 3,212 ms       | 0       |
| 쿼리 2번 요청    | 11,652     | 19.25        | 1,019 ms       | 319 ms         | 4,809 ms       | 0       |

- Primary Key(msg_id)는 기본값으로 ASC 정렬로 생성 되기 때문에 인덱스 정렬에 사용하지 않았습니다.
- 총 row 수를 가져와 다시 요청을 보내는 쿼리와 인덱스 설정하는 방법은 ORDER BY를 사용하지 않기 때문에 Sorting Error가 나지 않습니다.
- **DESC 인덱스 사용하는 쿼리문으로 바꾼 후 약 43.8% 빨라졌습니다.**
- 최종적으로 DESC 인덱스 쿼리를 사용했습니다.

</br>

### **4. 참고 자료 및 링크**

- [https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html)
- [https://dev.mysql.com/doc/refman/8.0/en/descending-indexes.html](https://dev.mysql.com/doc/refman/8.0/en/descending-indexes.html)
- [https://tech.kakao.com/2018/06/19/mysql-ascending-index-vs-descending-index/](https://tech.kakao.com/2018/06/19/mysql-ascending-index-vs-descending-index/)

</br>

<p align="right"><a href="#트러블-슈팅-목차">⬆ 트러블슈팅 목차로 돌아가기</a></p>

<br/></br>

<p align="right"><a href="#guzzi-room-project">⬆ 맨 위로 올라가기</a></p>
