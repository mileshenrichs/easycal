/**
 * Dev config: deploymentConfig apiUrl = '', package.json "proxy": "http://localhost:9000"
 * Prod config: deploymentConfig apiUrl = "https://easycalapi.site", package.json remove proxy setting
 */

// apiUrl: 'https://easycalapi.site'

export default function deploymentConfig() {
	return {
		baseUrl: '',
		apiUrl: ''
	};
}