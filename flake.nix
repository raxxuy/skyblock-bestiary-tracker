{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils = {
      url = "github:numtide/flake-utils";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            tree
            bun
            biome
          ];

          shellHook = ''
            echo "Welcome to the dev shell."
            if command -v fish > /dev/null; then
              echo "Fish is installed. Starting fish shell..."
              exec fish
            else
              echo "Fish is not installed. Staying in default shell."
            fi
          '';
        };
      }
    );
}
