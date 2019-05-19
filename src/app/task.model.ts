export class Task{
    public  _id:string;
    public  taskDetail:string;
	public  dueDate: Date;
	public  label:string;
	public  status:string;
	public  title:string;
	public  createDate:Date;
	public  updateDate:Date;
}

export class Status{
    public static statusSet:Set<String> = new Set(["NEW", "In progress", "Completed"]);  
}

export class Label{
    public static LabelSet:Set<String> = new Set(["Personal", "Work", "Shopping", "Others"]);  
}