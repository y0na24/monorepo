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
    port: env.port ?? 8002,
    paths,
    analyzer: env.analyzer ?? false,
    platform: env.platform ?? 'desktop'
  }

  const config = buildWebpack(options)

  config.plugins.push(
    new container.ModuleFederationPlugin({
      name: 'admin',
      filename: 'remoteEntry.js',
      exposes: {
        './Router': './src/router/router.tsx'
      },
      shared: {
        ...packageJson.dependencies,
        react: {
          eager: true,
          requiredVersion: packageJson.dependencies['react']
        },
        'react-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-dom']
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom']
        }
      }
    })
  )

  return config
}
