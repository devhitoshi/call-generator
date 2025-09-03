# DESIGN.md - コールジェネレータ 技術設計書

## 1. システムアーキテクチャ
本アプリケーションは、Reactのコンポーネントベースアーキテクチャを採用する。UIの構築にはUIフレームワーク「Shadcn/ui」を全面的に採用し、状態管理はカスタムフックとContext APIに集約する。

## 2. 主要ライブラリ
- **UIフレームワーク:** `shadcn-ui`, `tailwindcss`
- **状態管理:** `react (useState, useContext)`
- **インタラクション:** `dnd-kit` (ドラッグ＆ドロップ), `framer-motion` (アニメーション)
- **アイコン:** `react-icons`
- **画像出力:** `html2canvas`

## 3. コンポーネント設計
- **`App.js`:** アプリケーション全体のレイアウト定義と、モーダルの表示状態管理。
- **`Layout.js`:** カード型のコンテナを提供する。
- **`CallTable.js`:** テーブルの描画、ドラッグ＆ドロップUI、クリックイベントの通知を担当。
- **`ActionButtons.js`:** グローバルな操作ボタン（楽曲追加など）を表示。
- **`Dialog` (Shadcn/uiベース):** 全ての編集操作を担うモーダル。

## 4. 状態管理設計 (`useSongs.js`)
- **責務:** 全てのビジネスロジックと状態（`songs`, `parts`, `groupName`など）を一元管理する。
- **データ永続化:** `useEffect`フックを用いて、状態が変化するたびに`localStorage`へ自動保存する。初回ロード時には`localStorage`からデータを復元する。

## 5. データ構造
- **デフォルトデータ:** `public/data`以下の外部JSONファイル (`defaultParts.json`, `presets.json`) で管理し、初回ロード時に非同期で読み込む。
- **Song Object:** `{ "id": "unique-id", "name": "曲名", "calls": { "パート名": "コール内容" } }` の構造を持つ。