import {cmd} from '@definelabs/lib-deps-cli';

export default function command(cmd: cmd.Command) {
  cmd
    .argument("<package type>", "type of package")
    .action((packageType: string) => {
      console.log('dev for package', packageType);
    });
}
