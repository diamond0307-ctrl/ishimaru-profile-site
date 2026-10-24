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

HOMEは背景が続く対話構成。対話文は本人提供情報を一人称に編集したもの。生成AIによる自由回答チャットではない。

追加修正：ユーザー指定の「せかまる」を `/Users/sekamaru/Desktop/02_BRANDS_AND_ART/SEKAMARU/sekamaru.png` から無変更で複製。SVGの表示範囲と輪郭マスクで周囲の余白を取り除き、顔・耳は白、不透明で表示する。色はユーザーの希望に合わせてアプリコットと濃い青緑、見出しはゴシック体の大小・太さで構成。

上部の同行バーは撤去。各問いの吹き出し、答えの余白、写真の端、締めの位置を画面幅ごとに測定し、一体のせかまるがスクロールと逆スクロールに連動して巡る。問いでは大きく、答えでは小さくなって言葉と本人写真を主役にする。本文・リンクと重なる位置では余白へ退避。動きを減らす設定とJavaScript無効時には各問いの横に静止表示する。本文と通常のページリンクは常に読める。

ReactとMotion for Reactで質問の切替、写真のスクロール連動、読了位置を実装。動きを減らす端末設定に対応。本文はビルド時にHTMLへ出力し、JavaScriptがなくても主なプロフィールとリンクを読める。

`npm ci` → `npm run build`。編集元は `src/Home.jsx`、`src/client.jsx`、`dist/flow.css`、`dist/personality.css`。詳細ページは従来のHTMLを維持し、`dist/continuity.css`で調整。全ページの背景・書体は最後に読み込む `dist/atelier.css` で統一。`build.mjs`がHOMEのHTMLとブラウザー用バンドルを生成する。

## 2026-10-24 素材集からの背景選定・Web標準書体

- 参照：CREATIVE_KNOWLEDGEの背景／イラストライブラリ、CORE、DESIGN_EYE、Website Anti-AI。
- 背景48番（ミント×イエロー×ブルー）：会話から写真まで切れ目なく続く色面。背景12番（ブルーブラシ）：右端に限って紙と絵の具の質感を加える。固定背景のためセクションごとの画像反復・継ぎ目なし。ARTは作品の色が主役になるよう背景濃度を下げる。
- 原本：`/Users/sekamaru/Desktop/02_BRANDS_AND_ART/CANVA_ASSET_LIBRARY/01_BACKGROUNDS_16X9/48.png`、同フォルダ `12.png`。無変更で `dist/assets/library-background-48.png`、`library-background-12.png` へ複製。トリミング・濃度・合成はCSS表示のみ。
- イラスト一覧16シートも確認。今回は本人指定のせかまるが案内役を担うため、別キャラクターや装飾イラストは追加しない。
- 権利：両背景の `rights_status = unknown`。現在の本人限定プレビューへの適用であり、一般公開前に取得元と利用条件の確認が必要。
- 書体：ヒラギノ角ゴシックを先頭に指定。主要見出し800、本文600を基準。未搭載端末には游ゴシック／Meiryo／sans-serif。フォントファイルは同梱しない。
