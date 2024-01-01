import { buildWebpack } from '@packages/build-config/src/index'
import packageJson from './package.json'

import {
  BuildMode,
  BuildOptions,
  BuildPaths,
  BuildPlatform
} from '@packages/build-config/src/index'
import path from 'path'
import { container } from 'webpack'

interface EnvVariables {
  mode: BuildMode
  port: number
  analyzer: boolean
  platform: BuildPlatform
  SHOP_REMOTE_URL?: string
  ADMIN_REMOTE_URL?: string
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public')
  }

  const options: BuildOptions = {
    mode: env.mode ?? 'development',
    port: env.port ?? 8000,
    paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? 'desktop'
  }

  const config = buildWebpack(options)

  const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:8001'
  const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:8002'

  config.plugins.push(
    new container.ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
        admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          version: packageJson.dependencies['react']
        },
        'react-dom': {
          eager: true,
          version: packageJson.dependencies['react-dom']
        },
        'react-router-dom': {
          eager: true,
          version: packageJson.dependencies['react-router-dom']
        }
      }
    })
  )

  return config
}
