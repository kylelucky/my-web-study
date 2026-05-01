# 2주차: CSS Layout & Design

## 학습 목표

- Box Model 이해
- Flexbox와 Grid로 레이아웃 구성
- 미디어 쿼리로 반응형 웹 구현

## 핵심 개념

| 개념 | 설명 |
|------|------|
| Box Model | margin / border / padding / content 구조 |
| Flexbox | 1차원(행/열) 정렬 레이아웃 |
| Grid | 2차원 격자 레이아웃 |
| Media Query | 화면 크기에 따라 스타일 분기 |

## 과제

| 폴더 | 내용 | 상태 |
|------|------|------|
| `flexbox-menubar/` | Flexbox로 반응형 메뉴바 구현 | ✅ 완료 |
| `card-news/` | CSS 카드 레이아웃 + hover 이벤트 | ✅ 완료 |

## Troubleshooting

```
[문제] 모바일에서 nav 메뉴 아이템이 가로로 넘침
[원인] flex-direction이 row로 고정되어 있어 좁은 화면에서 overflow 발생
[해결] @media (max-width: 768px) 에서 flex-direction: column 으로 전환
       → 미디어 쿼리 breakpoint를 항상 실제 콘텐츠 기준으로 잡는 것이 중요
```
