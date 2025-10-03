import { readFileSync, writeFileSync, globSync } from "node:fs";

let lines = [
    "| Icon  | ID   | Link |",
    "| :---: | :--- | :--- |",
];

const img = (src: string) => `<img height="24" align="center" src="${src}">`;
for(let file of globSync("./emojis/**/*.*")) {
    console.log(file);
    const id = file.split("/").at(-1) || "";
    const local = `./${file}`;
    lines.push(`| ${[
        img(local),
        `\`${id}\``,
        `[Link](${local})`,
    ].join(" | ")} |`);
}

let content = lines.join("\n");
const readmeContents = readFileSync("README.md").toString();
const replaceRegex = /(<!--start:script-->)([\w\W]*)(<!--end:script-->)/g;
const wrappedContent = `<!--start:script-->\n\n${content}\n\n<!--end:script-->`
const newReadmeContents = readmeContents.replace(replaceRegex, wrappedContent);

writeFileSync("README.md", newReadmeContents);
console.log("Updated README!");
