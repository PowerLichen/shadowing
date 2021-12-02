# Shadowing Server API
기본적인 회원정보 시스템과, 쉐도잉 기능 구현을 위한 API.

## 목차
* 회원 시스템 API
    * [loadUser](#loadUser)
    * [Join](#Join)
    * [checkId](#checkId)
    * [login](#login)
    * [logout](#logout)
    * [studyTime](#studyTime)
* 쉐도잉 영상 API
    * [loadscript](#loadscript)
    * [reloadCaption](#reloadCaption)
    * [loadCurIndex](#loadCurIndex)

---
## loadUser
```
GET {{URL}}/user/loadUser
```
패스포트 모듈에 의해 저장되어 있는 사용자 정보를 반환.

* Success Response:
    * Code: 200
    * Contents: 
        ``` json
        {
            id: 12,
            userId: aa@bb.cc, 
            userPwd: ,
            nickname: 테스트,
            studySec: 63
        }
        ```
* Error Response:
    * Code: 200
    * Contents: `Null`

---
## Join
```
POST {{URL}}/user/Join
```
받아온 사용자 정보를 DB에 저장.

* Required:
    ``` json
    {
        id: abc@aa.cc,
        password: 1234,
        name: 테스트닉네임
    }
    ```


* Success Response:
    * Code: 200
    * Contents: `{ '계정 생성 완료' }`
* Error Response:
    * Code: 404
    * Contents: `{ 'Sorry cannot find that!' }`

---
## checkId
```
POST {{URL}}/user/checkId
```
받아온 ID가 DB에 중복된 아이디인지를 확인.

* Required:
    `
    {
        userId: abc@aa.cc,
    }
    `


* Success Response:
    * Code: 200
    * Contents: `{ '해당 아이디가 중복되지 않습니다.' }`
* Error Response:
    * Code: 404
    * Contents: `{ 'Sorry cannot find that!' }`
    
    OR
    
    * Code: 403
    * Contents: `{ '해당 아이디가 이미 DB에 있습니다.' }`

---
## login
```
POST {{URL}}/user/login
```
받아온 ID가 DB에 중복된 아이디인지를 확인.

* Required:
    `
    {
        userId: abc@aa.cc,
        password: 1234
    }
    `


* Success Response:
    * Code: 200
    * Contents: 
        ``` json
        {
            id: 12,
            userId: aa@bb.cc, 
            userPwd: ,
            nickname: 테스트,
            studySec: 63
        }
        ```
* Error Response:
    * Code: 404
    * Contents: `{ 'Sorry cannot find that!' }`
    
    OR
    
    * Code: 403
    * Contents: `{ message: '존재하지 않는 사용자입니다.' }`
    
    OR
    
    * Code: 403
    * Contents: `{ message: '비밀번호가 틀립니다.' }`

---
## logout
```
GET {{URL}}/user/logout
```
패스포트 모듈을 로그아웃을 수행하고, 세션에 저장된 정보를 삭제.

* Response:
    * Code: 200
    * Contents: `{ 'ok' }`

---
## studyTime
```
POST {{URL}}/user/studyTime
```
받아온 공부시간 값으로 DB 정보를 업데이트 하고, studySec값을 반환.

* Required:
    `
    {
        id: 11,
        studySec: 600
    }
    `


* Success Response:
    * Code: 200
    * Contents: 
        `
        {
            studySec: 600
        }
        `
* Error Response:
    * Code: 404
    * Contents: `{ 'Sorry cannot find that!' }`

---
## loadscript
```
GET {{URL}}/video/loadscript/:uid/:videoId
```

DB에서 영상 시청 기록을 불러오고, 해당 영상에 맞는 자막 정보를 반환.

이때, 자막 정보는 DB에 저장된 자막 인덱스 ± 5 범위의 자막만 반환.

* Required: `uid = 11, videoId = Xyc8d98a`

* Success Response:
    * Code: 200
    * Contents: 
        ``` json
        {
            videoId: 'Xyc8d98a',
            selectedIndex: 8,
            endIndex: 388,
            captions : [
                ...
                {
                    curIndex: 3,
                    start: 4, end: 8, text: 'subtitle1'
                },
                {
                    curIndex: 4,
                    start: 9, end: 14, text: 'subtitle2'
                },
                ...
            ]
        }
        ```
* Error Response:
    * Code: 404
    * Contents: `{ 'Sorry cannot find that!' }`

---
## reloadCaption
```
POST {{URL}}/video/reloadCaption
```

bool 데이터인 scrollDirection에 따라 불러올 데이터가 앞인지 뒤인지 정하고,

curIndex 기준으로 자막을 10개 호출하여 반환.

* Required: `{videoId: Xyc8d98a , curIndex: 13 , scrollDirection: True}`

* Success Response:
    * Code: 200
    * Contents: 
        ``` json
        {
            scrollDirection: true,
            captions : [
                {
                    curIndex: 14,
                    start: 34, end: 37, text: 'subtitle14'
                },
                {
                    curIndex: 15,
                    start: 40, end: 42, text: 'subtitle15'
                },
                ...
            ]
        }
        ```
* Error Response:
    * Code: 404
    * Contents: `{ 'Sorry cannot find that!' }`

---
## loadCurIndex
```
POST {{URL}}/video/loadCurIndex
```

curIndex를 DB의 시청 기록에 저장하고, curIndex를 반환.

* Required: `{ id: 11, videoId: Xyc8d98a , curIndex: 13 }`

* Success Response:
    * Code: 200
    * Contents: `{ '13' }`
* Error Response:
    * Code: 404
    * Contents: `{ 'Sorry cannot find that!' }`