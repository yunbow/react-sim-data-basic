# 基本データ構造シミュレータ

プログラミング初心者向けに**基本データ構造と操作手順を視覚的に学習できる Web アプリケーション**です。
各データ構造に対する操作をGUIベースで実行し、その動きをアニメーションとして可視化します。

## デモプレイ
https://yunbow.github.io/react-sim-basic-data/demo/

## 主要機能

### 対象データ構造

| データ構造 | 可視化仕様 | 操作概要 |
|---|---|---|
| Stack | LIFO 構造を上下方向に表示、Top を強調 | Push / Pop |
| Queue | FIFO 構造、Front / Rear を表示 | Enqueue / Dequeue |
| Array | インデックス付き表示、変更時に再配置をアニメーション表示 | 任意位置への挿入・削除・更新 |
| Linked List | ノードとリンク構造を表示、挿入/削除時にポインタ変化を可視化 | 任意位置への挿入・削除 |
| Hash Table | バケット表示、ハッシュ値への変換アニメーション | Key を用いた追加・削除・参照 |
| Set | 重複なし集合として表示 | Add / Remove |

### 共通機能

#### 操作 UI

- **データ構造選択**: プルダウンから操作対象を選択
- **データサイズ設定**: スライダーで初期データ生成数を設定（0〜20）
- **アニメーション速度調整**: スライダーで速度を調整（0ms〜2000ms）
- **リセット**: データ構造を初期状態へ戻し、ランダム生成データを再設定

#### 操作ログ

- 過去の操作履歴を最大20件表示
- 表記例：`Push(5)`、`Insert at index 2`、`Set("key1", 42)`、`Has(15) → true`

#### エラーハンドリング

- 不正操作時には UI で警告メッセージを表示
- 例：「操作できません:Stackが空です」「指定された位置は無効です」「既に存在する値です」

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - プログラミング言語
- **Storybook 7** - コンポーネント開発・ドキュメント
- **CSS Modules** - スタイリング
- **Vite** - ビルドツール

## プロジェクト構造

```
src/
├── features/                      # 機能別モジュール
│   └── simulator/                 # シミュレーター機能
│       ├── components/            # 機能専用コンポーネント
│       │   ├── StackVisualizer/   # Stack可視化
│       │   ├── QueueVisualizer/   # Queue可視化
│       │   ├── ArrayVisualizer/   # Array可視化
│       │   ├── StackOperations/   # Stack操作パネル
│       │   ├── QueueOperations/   # Queue操作パネル
│       │   ├── ArrayOperations/   # Array操作パネル
│       │   ├── ControlPanel/      # 制御パネル
│       │   └── OperationLog/      # 操作ログ表示
│       ├── hooks/                 # カスタムフック
│       │   ├── useStack.ts        # Stack操作ロジック
│       │   ├── useQueue.ts        # Queue操作ロジック
│       │   ├── useArray.ts        # Array操作ロジック
│       │   ├── useAnimationControl.ts  # アニメーション制御
│       │   └── useHistory.ts      # 履歴管理
│       ├── DataStructureSimulator.tsx  # メインコンポーネント
│       └── types.ts               # 型定義
├── components/                    # 共通UIコンポーネント
│   ├── Button/                    # ボタン
│   ├── Input/                     # テキスト入力
│   ├── Select/                    # セレクトボックス
│   └── Slider/                    # スライダー
├── types/                         # 汎用的な型定義
├── stories/                       # Storybook用ストーリー
├── App.tsx                        # メインアプリ
└── main.tsx                       # エントリーポイント
```

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview

# Storybook起動
npm run storybook

# Storybook ビルド
npm run build-storybook
```

MIT License
