import process, { env, execArgv, pid, title } from "node:process"
import pkg from "../package.json" with { type: "json" }

/**
 * Main entry point for the application.
 * Initializes the process, logs startup information, and sets up signal handlers
 * for graceful shutdown and error handling.
 */
export default function main(): void {
    // Log process startup information
    console.error(`Main process launched [${title} :: ${pid}]`)
    console.error(`Process name: ${pkg.name}`)
    console.error(`Node.js environment: ${env?.["NODE_ENV"] ?? ""}`)
    console.error(
        `Node.js process options: ${execArgv.concat(env?.["NODE_OPTIONS"] ?? []).join(" | ")}`,
    )

    // Handle SIGINT signal (Ctrl+C) for graceful shutdown
    process.on("SIGINT", (signal) => {
        console.error(`Received signal: ${signal}`)
        process.exit(1)
    })

    // Handle uncaught exceptions to prevent silent failures
    process.on("uncaughtException", (error, origin) => {
        console.error(`Uncaught exception: ${error}`)
        console.error(`Exception origin: ${origin}`)
        process.exit(1)
    })

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason, p) => {
        console.error(
            `Unhandled promise rejection at promise: ${JSON.stringify(p)}`,
        )
        console.error(`Reason:\n${reason}`)
        process.exit(1)
    })
}
