/**
 * @file
 * Boot2Docker ISO build command.
 */

'use strict';

var
  gulp,
  shell,
  doExec,
  release,
  manifest,
  repository;

gulp = require('gulp');
shell = require('shelljs');
release = require('gulp-github-release');

manifest = require('./package.json');

doExec = function (cmd) {
  var
    out;

  out = shell.exec(cmd);

  if (out.code !== 0) {
    throw new Error(out.output);
  }
}

gulp.task('build', function () {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("Please setup a Github API token and expose it as an environment variable called 'GITHUB_TOKEN'.");
  }

  repository = manifest.repository.url.split('/');

  doExec('docker2 build -t boot2docker .');
  doExec('docker run -i boot2docker > boot2docker.iso');

  gulp.src('./boot2docker.iso')
    .pipe(release({
      token: process.env.GITHUB_TOKEN,
      draft: true,
      owner: repository[repository.length - 2],
      repo: repository[repository.length - 1].replace('.git', ''),
      tag: 'v' + manifest.version,
      manifest: manifest
    }));
});

gulp.task('default', ['build']);
