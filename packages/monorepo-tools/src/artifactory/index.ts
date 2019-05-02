/**
 * Base algorithm:
 * 
 * Make a package tarball with npm pack
 * Copy the tarball to artifacts
 * [major.minor.path-prerelease, major.minor.x, major.x]
 * 
 * Artifactory Server
 * Artifactory Server just parses the name and the version from the request url
 * and redirects it to github raw url or to local file
 * Server accepts requests like `localhost:8090/artifact/${name}/${version}
 */