var documenterSearchIndex = {"docs":
[{"location":"public/representations/#Representation","page":"Representations","title":"Representation","text":"","category":"section"},{"location":"public/representations/","page":"Representations","title":"Representations","text":"CurrentModule = BiochemicalVisualization","category":"page"},{"location":"public/representations/","page":"Representations","title":"Representations","text":"Pages = [\"representations.md\"]","category":"page"},{"location":"public/representations/#Available-representations","page":"Representations","title":"Available representations","text":"","category":"section"},{"location":"public/representations/","page":"Representations","title":"Representations","text":"ball_and_stick\nstick\nvan_der_waals","category":"page"},{"location":"public/representations/#BiochemicalVisualization.ball_and_stick","page":"Representations","title":"BiochemicalVisualization.ball_and_stick","text":"ball_and_stick(::AbstractAtomContainer)\n\nCreates and displays a ball-and-stick representation for the given atom container.\n\n\n\n\n\n","category":"function"},{"location":"public/representations/#BiochemicalVisualization.stick","page":"Representations","title":"BiochemicalVisualization.stick","text":"stick(::AbstractAtomContainer)\n\nCreates and displays a stick representation for the given atom container.\n\n\n\n\n\n","category":"function"},{"location":"public/representations/#BiochemicalVisualization.van_der_waals","page":"Representations","title":"BiochemicalVisualization.van_der_waals","text":"van_der_waals(::AbstractAtomContainer)\n\nCreates and displays a van-der-Waals representation for the given atom container. Sphere radii generally depend on the radius field of the corresponding atoms but are at least 1 Å.\n\n\n\n\n\n","category":"function"},{"location":"CONTRIBUTING/#Contributing-Guidelines","page":"Contributing Guidelines","title":"Contributing Guidelines","text":"","category":"section"},{"location":"CONTRIBUTING/#Certificate-of-Origin","page":"Contributing Guidelines","title":"Certificate of Origin","text":"","category":"section"},{"location":"CONTRIBUTING/","page":"Contributing Guidelines","title":"Contributing Guidelines","text":"Source: Developer Certificate of Origin","category":"page"},{"location":"CONTRIBUTING/","page":"Contributing Guidelines","title":"Contributing Guidelines","text":"Developer Certificate of Origin\nVersion 1.1\n\nCopyright (C) 2004, 2006 The Linux Foundation and its contributors.\n\nEveryone is permitted to copy and distribute verbatim copies of this\nlicense document, but changing it is not allowed.\n\n\nDeveloper's Certificate of Origin 1.1\n\nBy making a contribution to this project, I certify that:\n\n(a) The contribution was created in whole or in part by me and I\n    have the right to submit it under the open source license\n    indicated in the file; or\n\n(b) The contribution is based upon previous work that, to the best\n    of my knowledge, is covered under an appropriate open source\n    license and I have the right under that license to submit that\n    work with modifications, whether created in whole or in part\n    by me, under the same open source license (unless I am\n    permitted to submit under a different license), as indicated\n    in the file; or\n\n(c) The contribution was provided directly to me by some other\n    person who certified (a), (b) or (c) and I have not modified\n    it.\n\n(d) I understand and agree that this project and the contribution\n    are public and that a record of the contribution (including all\n    personal information I submit with it, including my sign-off) is\n    maintained indefinitely and may be redistributed consistent with\n    this project or the open source license(s) involved.","category":"page"},{"location":"CONTRIBUTING/","page":"Contributing Guidelines","title":"Contributing Guidelines","text":"All contributions to this project need to be in agreement with the Developer Certificate of Origin. In particular, all commits contributed to this repository need to include the following line in their respective commit message to certify agreement, with name and e-mail address modified accordingly:","category":"page"},{"location":"CONTRIBUTING/","page":"Contributing Guidelines","title":"Contributing Guidelines","text":"Signed-off-by: Name <E-mail>","category":"page"},{"location":"CONTRIBUTING/","page":"Contributing Guidelines","title":"Contributing Guidelines","text":"You can use the --signoff (or -s) option of the git commit command to facilitate this process.","category":"page"},{"location":"tutorials/getting_started/#Getting-started","page":"Getting started","title":"Getting started","text":"","category":"section"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"BiochemicalVisualization.jl provides graphical representations of molecular systems. In the following example, a sample structure is loaded through BiochemicalAlgorithms.jl and prepared for visualization later on.","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"using BiochemicalAlgorithms, BiochemicalVisualization\n\n# Read PDB file from the BiochemicalAlgorithms.jl repository\nsys = load_pdb(ball_data_path(\"../test/data/AlaAla.pdb\"))\n\n# Prepare molecule\nfdb = FragmentDB()\nnormalize_names!(sys, fdb)\nreconstruct_fragments!(sys, fdb)\nbuild_bonds!(sys, fdb)","category":"page"},{"location":"tutorials/getting_started/#Available-representations","page":"Getting started","title":"Available representations","text":"","category":"section"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"The following code examples showcase all currently available representations. Please note that, on this page, all interactive widgets are replaced by screenshots thereof. When executed locally, e.g., in a Julia REPL or in a Jupyter notebook, the code examples should open a browser window with the correpsonding widget or embed the widget into the notebook, respectively.","category":"page"},{"location":"tutorials/getting_started/#Ball-and-stick-representation","page":"Getting started","title":"Ball-and-stick representation","text":"","category":"section"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"ball_and_stick(sys)","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"(Image: Ball-and-stick representation of a simple molecule)","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"Ball-and-stick representation of a simple molecule","category":"page"},{"location":"tutorials/getting_started/#Stick-representation","page":"Getting started","title":"Stick representation","text":"","category":"section"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"stick(sys)","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"(Image: Stick representation of a simple molecule)","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"Stick representation of a simple molecule","category":"page"},{"location":"tutorials/getting_started/#Van-der-Waals-surface-representation","page":"Getting started","title":"Van-der-Waals surface representation","text":"","category":"section"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"van_der_waals(sys)","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"(Image: Van-der-waals representation of a simple molecule with unit radii)","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"Van-der-waals representation of a simple molecule with unit radii","category":"page"},{"location":"tutorials/getting_started/","page":"Getting started","title":"Getting started","text":"Please note that the sphere radii are currently not automatically assigned by atom type but rather read from the corresponding Atom object (i.e., from its radius field).","category":"page"},{"location":"#BiochemicalVisualization","page":"Home","title":"BiochemicalVisualization","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Dev) (Image: Build Status)","category":"page"},{"location":"","page":"Home","title":"Home","text":"BiochemicalVisualization is the graphical interface for BiochemicalAlgorithms.jl, providing different representations for biomolecular systems. All representations can be visualized in the form of interactive web widgets that are embeddable in Jypyter notebooks.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install BiochemicalVisualization, open a Julia REPL, switch to the package mode by pressing ], and type","category":"page"},{"location":"","page":"Home","title":"Home","text":"pkg> add https://github.com/hildebrandtlab/BiochemicalVisualization.jl","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using BiochemicalAlgorithms, BiochemicalVisualization\n\n# Read PDB file from the BiochemicalAlgorithms.jl repository\nsys = load_pdb(ball_data_path(\"../test/data/AlaAla.pdb\"))\n\n# Prepare molecule\nfdb = FragmentDB()\nnormalize_names!(sys, fdb)\nreconstruct_fragments!(sys, fdb)\nbuild_bonds!(sys, fdb)\n\n# Visualize using ball-and-stick representation\nball_and_stick(sys)","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"You have ideas for improvements, criticism, or ran into problems?  You are looking for a feature that you know from BALL? Feedback and contributions are very welcome. Check out our guidelines and use our issue tracker or contact us via e-mail.","category":"page"}]
}
