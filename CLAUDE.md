# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**Sio grooming**（シオ グルーミング）の静的ウェブサイト。岡山県瀬戸内市の犬専門トリミングサロン。純粋なHTML/CSS/JSのシングルページ構成で、ビルドツール・パッケージマネージャー・フレームワークは使用しない。

## ファイル構成

| ファイル | 役割 |
|---------|------|
| `index.html` | メインページ（全セクション含む1ファイル完結） |
| `terms.html` | 利用規約ページ |
| `画像/` | 全素材画像（PNG） |
| `Design.md` | デザイン仕様（参考：別サロン向けだが色・レイアウト参考として残存） |
| `webサイト内容.md` | サイトの全コンテンツ定義書（正規ソース） |

## 開発・確認方法

ビルド不要。ブラウザで直接開く：

```
open /Users/chiharusaito/Desktop/ペットサロンご依頼/index.html
```

## カラーパレット

```
--brown:      #7B4A1E  メインブラウン（見出し・アクセント）
--brown-dark: #4A2E10  本文テキスト
--brown-mid:  #7B5C3A  サブテキスト・キャプション
--yellow:     #F5C024  アクセント（花・ポイント）
--green:      #7BAF3A  植物モチーフ
--cream:      #FDF8F0  ページ背景（heroセクション含む）
--beige:      #F5ECD9  カード・セクション背景
--border:     #E8D9C0  区切り線
```

## サイト構成（index.html 内セクション順）

1. `header` — 固定ナビ（スクロールで白背景に変化）
2. `#hero` — ロゴ画像＋予約ボタン＋6アイコンナビ
3. `#concept` — サロンコンセプト文（犬アイコン透かし背景）
4. `#trimmer` — トリマー紹介
5. `#menu` — トリミング料金表
6. `#gallery` — Instagramギャラリー（プレースホルダー）
7. `#faq` — よくある質問（アコーディオン）
8. `#access` — 店舗情報・Googleマップ・利用規約バナー
9. `footer` — ロゴ・連絡先・SNS・ナビ・動物取扱業登録情報

## 画像ファイルと用途

| ファイル名 | 用途 |
|-----------|------|
| `sio-grooming-logo-transparent.png` | heroセクションのメインロゴ（背景透過済み） |
| `ロゴのみ.png` | ヘッダー・フッターのロゴ |
| `ご予約はこちら.png` | 予約CTAボタン画像 |
| `トリマー.png` | トリマー紹介写真 |
| `トリマーアイコン.png` | heroアイコンナビ（TRIMMER） |
| `シザース.png` | heroアイコンナビ（TRIMMING） |
| `犬アイコン.png` | CONCEPTセクション透かし背景 |
| `犬.png` | フッター透かし背景 |

## 重要な実装詳細

**ロゴ画像の背景処理**  
`sio-grooming-logo-transparent.png` はPython（Pillow）のフラッドフィルで元画像（サイトトップ修正版.png）の背景色を透過処理して生成。`background: transparent` のみで馴染む。`mix-blend-mode` は使用しない。

**スクロールアニメーション**  
`.reveal` クラスを持つ要素は IntersectionObserver で `visible` クラスを付与してフェードイン。heroセクション内の要素はページロード時に `animation-name: fadeup` で直接アニメーション（遅延順：ロゴ0.1s→ボタン0.6s→6アイコン0.85s〜1.65s）。

**FAQアコーディオン**  
`toggleFaq()` 関数で `.faq-item` に `.open` クラスを付与。一度に1つのみ開く。

**heroセクションの6アイコン**  
ABOUT US（#concept）/ TRIMMER / TRIMMING / GALLERY / FAQ / ACCESS の順で横一列配置。`flex-wrap: nowrap`、スマホは700px以下で折り返し。
