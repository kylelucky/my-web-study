# 1주차: HTML & Web 기초

## 학습 목표

- 웹의 동작 원리 이해 (Client-Server 구조)
- 시맨틱 태그(Semantic Tags) 활용
- Git으로 버전 관리 시작하기

## 핵심 개념

| 개념 | 설명 |
|------|------|
| Client-Server | 브라우저(클라이언트)가 서버에 요청 → 서버가 HTML 응답 |
| Semantic Tags | `<header>`, `<main>`, `<article>` 등 의미 있는 태그 사용 |
| HTML 구조 | `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` 기본 뼈대 |

## 과제

| 폴더 | 내용 | 상태 |
|------|------|------|
| `intro-page/` | HTML만으로 자기소개 페이지 제작 | ✅ 완료 |

## Troubleshooting

```
[문제] DOCTYPE 선언 오타 (!DOCTYPE html> 로 작성)
[원인] < 기호 누락
[해결] <!DOCTYPE html> 로 수정 — 브라우저가 표준 모드로 파싱하도록 강제
```
