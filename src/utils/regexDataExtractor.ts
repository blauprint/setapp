//WORK IN PROGRESS
export default async function regexDataExtractor(data: string) {
  let projectNameRegex = /"projectName":\s*"([^"]*)"/;
  // let toDoListRegex = /"toDoList":\s*\[\s*"([^"]*)"\s*\]/;
  let summaryRegex = /"summary":\s*"([^"]*)"/;
  let frontendRegex = /"frontend":\s*{([^}]*)}/;
  let backendRegex = /"backend":\s*{([^}]*)}/;

  //TODO: memoize regexes
  let regexes: RegExp[] = [
    summaryRegex,
    projectNameRegex,
    // toDoListRegex,
    frontendRegex,
    backendRegex,
  ];

  // while (regexes.length > 0 && isLoading) {
  //   let regex = regexes.pop();
  //   if (regex) {
  //     let match = data.match(regex);
  //     if (match) {
  //       console.log(match);
  //     }
  //   }
  // }

  if (projectNameRegex.test(data)) {
    let projectName = data.match(projectNameRegex);
    console.log(projectName);
  }
}
