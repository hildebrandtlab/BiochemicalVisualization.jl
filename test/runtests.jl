using TestItemRunner

# Exclude `tmp/` — it holds the unported fork under
# tmp/BiochemicalVisualization.jl whose @testitem blocks reference
# fork-only symbols (PartialBackboneConfig, check_config,
# PlainNonStdMesh, …) that the current API deliberately doesn't
# carry. TestItemRunner walks the whole package tree by default, so
# without this filter the fork's tests run and dozens of "UndefVar"
# errors drown out the real result.
@run_package_tests verbose=true filter=ti -> !occursin("/tmp/", ti.filename)
