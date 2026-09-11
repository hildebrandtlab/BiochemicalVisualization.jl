# Contributing Guidelines

## Building the documentation locally

The documentation has its own Julia environment in [`docs/`](docs/Project.toml) that
includes Documenter; the package's own `Project.toml` deliberately does not. Run
`make.jl` against that environment, not the default project:

```sh
# one-time: path-dev the package into the docs environment
julia --project=docs -e 'using Pkg; Pkg.develop(path="."); Pkg.instantiate()'

# build the docs (output lands in docs/build/)
julia --project=docs docs/make.jl
```

Re-run the bootstrap line only after a clean clone or after editing
`docs/Project.toml`. The deployment step at the end of `make.jl` is a no-op outside
of CI, so local builds will print "Skipping deployment" — that is expected.

## Certificate of Origin

Source: [Developer Certificate of Origin](https://developercertificate.org/)

```
Developer Certificate of Origin
Version 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.

Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.


Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```
All contributions to this project need to be in agreement with the Developer Certificate of Origin. In particular, all commits contributed to this repository need to include the following line in their respective commit message to certify agreement, with name and e-mail address modified accordingly:
```
Signed-off-by: Name <E-mail>
```
You can use the `--signoff` (or `-s`) option of the `git commit` command to facilitate this process.
