'use client' // クライアントサイドでレンダリングされるコンポーネントに必要な記述
import { AnimatePresence, motion } from 'framer-motion'
export default function MotionWrapper({
    children,s, style
}: {
    children: React.ReactNode,
    s?: number,
    style?: string
}) {
    // 一意のキーを設定するためにラップした画面のパスを取得
    return (
        // アンマウント時の動きをつけるために必要な記述
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: s ? s : 0.5 }}
                className={style ? style : ""}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
