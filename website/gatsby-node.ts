// @ts-expect-error pnp-webpack-plugin doesn't provide types
import * as PnpWebpackPlugin from 'pnp-webpack-plugin'
import { type CreateWebpackConfigArgs } from 'gatsby'
import { defines } from './env'

const moduleFile = __filename

export const onCreateWebpackConfig = ({ actions, plugins }: CreateWebpackConfigArgs) => {
  // Yarn PnP supports
  actions.setWebpackConfig({
    resolveLoader: {
      plugins: [
        PnpWebpackPlugin.moduleLoader(moduleFile)
      ]
    },
    resolve: {
      plugins: [
        PnpWebpackPlugin.bind(`${moduleFile}/.cache`, moduleFile, 'gatsby'),
        PnpWebpackPlugin.bind(`${moduleFile}/public`, moduleFile, 'gatsby'),
        PnpWebpackPlugin
      ]
    }
  })

  actions.setWebpackConfig({
    plugins: [
      // Add the environment variables to webpack.DefinePlugin with define().
      plugins.define(defines(/API_URL|CABLE_URL/))
    ].filter(Boolean)
  })
}
