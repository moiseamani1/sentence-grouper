//Route implementations
var express=require("express")
var app=express();
var bodyParser=require("body-parser")
var output_resultshtml;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")


app.listen(3000,function(){
	console.log("Server listening on port 3000 ")
});

//Initial Home sentence grouper page
app.get("/",(req,res)=>{	
	var formattedSentences =fix(list_sentences);
	res.render("home",{listSentences:formattedSentences,result: input_sentences,threshold:getInputThreshold()});	
		
})

//Model Description page
app.get("/modelDesc",(req,res)=>{
	res.render("modelDesc")	
			
})


app.post("/",async (req,res)=>{
	
	var threshold=req.body.sentencelist.threshold;
	setInputThreshold(threshold);
	
	//Extract raw sentences string from text area
	var sSentences=req.body.sentencelist.text;
	
	//Split into useful array
	var textArr=sSentences.split("\n");
	var cleanArr = [];
	textArr.forEach((elem=>{
		if(elem.trim()==='\r' || elem== null || elem.trim()===''){
			
		}else{
			cleanArr.push(elem.trim())
		}
		
	}))
	
	//Find similarity with new set of sentences and update UI
	let out= await get_similarity(cleanArr)
	res.render("home",{listSentences:sSentences,result: output_resultshtml,threshold:threshold})
})


//Text similarity implementation

const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');


 list_sentences = ['I like lasagna','I predict some rain today','Will it snow tomorrow?','Recently a lot of hurricanes have hit the US','Global warming is real','This pizza is the best',
				   'I love bolognese','I cook on Wednesday','we are going to school today','I am mad at him','I am going through emotional trauma','She speaks too loudly','I think he likes you',
				  'We are going to Paris','I love travelling','I travelled last summer','I go on trips to Spain','Some humans can fly','Have you seen a flying car before'];

var input_sentences='<div class="ui raised card"><div class="content"><div class="header">Group 1</div></div><div class="content"><h4 class="ui sub header">sentence list</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary">I like lasagna</div></div></div><div class="event"><div class="content"><div class="summary">This pizza is the best</div></div></div><div class="event"><div class="content"><div class="summary">I love bolognese</div></div></div><div class="event"><div class="content"><div class="summary">I cook on Wednesday</div></div></div></div></div></div>	<div class="ui raised card"><div class="content"><div class="header">Group 2</div></div><div class="content"><h4 class="ui sub header">sentence list</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary">I predict some rain today</div></div></div><div class="event"><div class="content"><div class="summary">Will it snow tomorrow?</div></div></div><div class="event"><div class="content"><div class="summary">Global warming is real</div></div></div></div></div></div>	<div class="ui raised card"><div class="content"><div class="header">Group 3</div></div><div class="content"><h4 class="ui sub header">sentence list</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary">Recently a lot of hurricanes have hit the US</div></div></div><div class="event"><div class="content"><div class="summary">Global warming is real</div></div></div></div></div></div>	<div class="ui raised card"><div class="content"><div class="header">Group 4</div></div><div class="content"><h4 class="ui sub header">sentence list</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary">I am mad at him</div></div></div><div class="event"><div class="content"><div class="summary">I am going through emotional trauma</div></div></div></div></div></div>	<div class="ui raised card"><div class="content"><div class="header">Group 5</div></div><div class="content"><h4 class="ui sub header">sentence list</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary">We are going to Paris</div></div></div><div class="event"><div class="content"><div class="summary">I go on trips to Spain</div></div></div></div></div></div>	<div class="ui raised card"><div class="content"><div class="header">Group 6</div></div><div class="content"><h4 class="ui sub header">sentence list</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary">I love travelling</div></div></div><div class="event"><div class="content"><div class="summary">I travelled last summer</div></div></div><div class="event"><div class="content"><div class="summary">I go on trips to Spain</div></div></div></div></div></div><div class="ui raised card"><div class="content"><div class="header">Group 7</div></div><div class="content"><h4 class="ui sub header">sentence list</h4><div class="ui small feed"><div class="event"><div class="content"><div class="summary">Some humans can fly</div></div></div><div class="event"><div class="content"><div class="summary">Have you seen a flying car before</div></div></div></div></div></div>';
var input_threshold= 0.5;
  
var analyzing_text;

//Helping methods
function getInputThreshold(){
	return input_threshold;
}
function setInputThreshold(threshold){
	input_threshold=threshold;
}
function fix(sentences){
	let str=""
	sentences.forEach((sentence)=>{
	str=str+sentence+"\n"	
	})
	return str			  
}

//Text similarity functions
function get_embeddings(list_sentences, callback) {
      return use.load().then(model => {
        return model.embed(list_sentences).then(embeddings => {
            return callback(embeddings)
		
			
        });
      });
}


function dotProduct(a, b){
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var result = 0;
    for (var key in a) {
      if (hasOwnProperty.call(a, key) && hasOwnProperty.call(b, key)) {
        result += a[key] * b[key]
      }
    }
    return result
}

function cosine_similarity(a, b) {
  if (Math.sqrt(dotProduct(a, a)) && Math.sqrt(dotProduct(b, b)))
    return dotProduct(a, b) / (Math.sqrt(dotProduct(a, a)) * Math.sqrt(dotProduct(b, b)));
  else return false
}

function cosine_similarity_matrix(matrix){
  	let cosine_similarity_matrix = [];
	let i=0;
  	while(i<matrix.length){
	  
    	let r = [];//row
		let j=0;  
    	while(j<i){
			r.push(cosine_similarity_matrix[j][i]);
			j+=1;
		}    
		r.push(1);
		j= i+1;  
		while(j<matrix.length){
		  r.push(cosine_similarity(matrix[i],matrix[j]));
		  j+=1
		}
		cosine_similarity_matrix.push(r);
		i+=1;
	  }

	  return cosine_similarity_matrix;


}


function createGroups(cosine_similarity_matrix){
    let DictKeyGroup = {};
    let groups = [];
	let i=0;
    while(i<cosine_similarity_matrix.length){
		var this_row = cosine_similarity_matrix[i];
		let j=i;	
      	while( j<this_row.length){
			if(i!=j){
			  let sim_score= cosine_similarity_matrix[i][j];

			  if(sim_score > getInputThreshold()){

				var group_num;

				if(!(i in DictKeyGroup)){
				  group_num = groups.length;
				  DictKeyGroup[i] = group_num;
				}else{
				  group_num = DictKeyGroup[i];
				}
				if(!(j in DictKeyGroup)){
				  DictKeyGroup[j] = group_num;
				}

				if(groups.length <= group_num){
				  groups.push([]);
				}
				groups[group_num].push(i);
				groups[group_num].push(j);
			  }
			}
			j+=1;  
      }
    i+=1
	}

    let returned_groups = [];
    for(var k in groups){
      returned_groups.push(Array.from(new Set(groups[k])));
    }
	return returned_groups ;
}


async function get_similarity(list_sentences){
	 
	 

    let callback = function(embeddings) {
	     let groups = createGroups(cosine_similarity_matrix(embeddings.arraySync()));
    	 let html_groups = "";
      	for(let i in groups){
			html_groups+='	<div class="ui raised card">'+
					'<div class="content">'+
						'<div class="header">Group '+String(parseInt(i)+1)+'</div>'+
					'</div>'+
					'<div class="content">'+
						'<h4 class="ui sub header">sentence list</h4>'+
						'<div class="ui small feed">';
				
				for(let j in groups[i]){
   					html_groups+='<div class="event">'+
								'<div class="content">'+
									'<div class="summary">'+
										list_sentences[ groups[i][j]]+
									'</div>'+
								'</div>'+
							'</div>';      
          		
        }	
	html_groups+='</div>'+
				'</div>'+
			'</div>';  
      } 

    output_resultshtml = html_groups;

    };

    let embeddings = await get_embeddings(list_sentences, callback.bind(this))

}
