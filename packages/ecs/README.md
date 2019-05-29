# ECS

# EntityType

EntityType is represented by a hash sum of its components.
For performance issue entity is stores `symbol` instead of string hash.

# Symbol vs WeakMap
According to https://jsperf.com/short-vs-long-keys-in-hash, symbols as keys are fastest.

WeakMaps are even faster.

