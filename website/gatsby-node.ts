// @ts-expect-error pnp-webpack-plugin doesn't provide types
import * as PnpWebpackPlugin from 'pnp-webpack-plugin'
import { type CreateWebpackConfigArgs } from 'gatsby'

const moduleFile = __filename

export const onCreateWebpackConfig = ({ actions }: CreateWebpackConfigArgs) => {
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
}
