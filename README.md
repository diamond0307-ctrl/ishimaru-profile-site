# ISHIMARU PROFILE SITE

石丸篤史のビジネス用公式プロフィールサイトの非公開ドラフトです。

## Source of truth

- /Users/sekamaru/Desktop/ISHIMARU_PROFILE_ARCHIVE/PROFILE_TIMELINE.md
- /Users/sekamaru/Desktop/ISHIMARU_PROFILE_ARCHIVE/ARCHIVE_INDEX.md
- /Users/sekamaru/Desktop/ISHIMARU_PROFILE_ARCHIVE/ARCHIVE_INDEX.csv

原本アーカイブは変更せず、Web用画像を dist/assets/ に別ファイルとして書き出しています。

## Public release checklist

- 第三者が写る展示写真の掲載許諾
- メディア誌面の転載許諾
- UNIQLO × 博多織関連画像の公開許諾
- 作品名、制作年、技法、寸法
- 問い合わせ送信先と個人情報の取り扱い
- 各案件の担当範囲

## Contact form

正式な送信先は未設定です。相談内容の案内のみで、送信・保存機能はありません。

## 2026-10-24 対話型リニューアル

本人の今回の言葉「ありのままに生きることがアートになる」を主メッセージとして採用。AIで人間にしかできない体験を楽しむ社会を目指すことはビジョンとして記載。既存実績の根拠は現在の `/Users/sekamaru/Desktop/02_BRANDS_AND_ART/ISHIMARU_PROFILE_ARCHIVE/` 内の本人提供タイムラインと素材インデックス。

HOMEは白背景が続く対話構成。案内役の丸い線画はWeb用に作ったUIで、本人の既存作品・公式キャラクターという扱いではない。対話文は本人提供情報を一人称に編集したもの。生成AIによる自由回答チャットではない。

ReactとMotion for Reactで質問の切替、写真のスクロール連動、読了位置を実装。動きを減らす端末設定に対応。本文はビルド時にHTMLへ出力し、JavaScriptがなくても主なプロフィールとリンクを読める。

`npm ci` → `npm run build`。編集元は `src/Home.jsx`、`src/client.jsx`、`dist/flow.css`。詳細ページは従来のHTMLを維持し、`dist/continuity.css`で白背景を統一。`build.mjs`がHOMEのHTMLとブラウザー用バンドルを生成する。
