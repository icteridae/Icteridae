import { deepFilter, deleteTreeNode, getSubtreePaperIds } from "../Components/SavedPapers/PageSavedPapersFunctions";
import { TreeNode } from "../Components/SavedPapers/PaperTree";

/**
 * Loads the recent papers from the web-storage
 * @returns the stored recent papers
 */
export function getRecentPapers(){
    const storedPapers : Array<string> = localStorage && JSON.parse(localStorage.getItem("papers") as string);
    return storedPapers;
}

/**
 * Stores the recent papers in the web-storage
 * @param papers is the array of papers
 */
export function setRecentPapers(papers: Array<string>){
    if(typeof(papers) !== "undefined") {
        localStorage.removeItem("papers");
        localStorage.setItem("papers", JSON.stringify(papers));
    }
    return;
}

/**
 * returns the savedPaperTree from the webstorage
 */
export function getSavedPapers() {
    const savedPaperTree = JSON.parse(localStorage.getItem("savedpapers") as string);
    if (!savedPaperTree)
        return [];
    return savedPaperTree;

}

/**
 * stores a new savedPaperTree to the webstorage
 * @param savedPapers is stored to the webstorage
 */
export function setSavedPapers(savedPapers: Array<TreeNode>)
{
    if(typeof(savedPapers) !== "undefined") {
        localStorage.setItem("savedpapers", JSON.stringify(savedPapers));
    }
    return;
}

/**
 * Adds a Paper id to the saved Paper tree
 * @param id of the saved paper
 */
export function addSavedPaper(id : string)
{
    let savedPapers = getSavedPapers();
    const paper_ids = getSubtreePaperIds(savedPapers);
    
    if (id in paper_ids) {
        return
    }

    savedPapers.push({paperId: id });

    setSavedPapers(savedPapers);
}

export function removeSavedPaper(id: string) {
    const savedPapers = getSavedPapers();
    setSavedPapers(deepFilter(savedPapers, (node) => node.paperId !== id))
}

export function getSavedPapersList() {
    return getSubtreePaperIds(getSavedPapers())
}

/**
 * local function to get an array of the stored paperIds
 * @param tree to search ids in
 */
function GetPaperIds(tree : Array<TreeNode>) {
    let ids = [];
    for(let item in tree) {
        if(tree[item].value.charAt(0) == 'p') {
            ids.push(parseInt(tree[item].value.substring(1)));
        }
        else {
            ids.concat(GetPaperIds(tree[item].children!));
        }
    }
    return ids;
}

export function addRecentPaper(id: string): void {
    let lst = getRecentPapers();
    setRecentPapers(lst ? [id].concat(lst.filter(x=>x!==id)).slice(0,10) : [id]);
  }

export function getSavedSliders(): number[] {
    return JSON.parse(localStorage.getItem("slider") as string) as Array<number>;
}

export function setSavedSliders(slider: Array<number>) {
    if(typeof(slider) !== "undefined") {
        localStorage.setItem("slider", JSON.stringify(slider));
    }
}
