// playground requires you to assign document definition to a variable called dd

var dd = {
	content: [
	        {
			text: 'ISHARA MADAWA KUMARARATHNA',
			style: 'header',
			alignment: 'center',
			margin: [0, 10]
	    	},
	    	{
	    	   columns: [
							{text: 'ADDRESS: No 21,Supreme City, Karundupona, Kegalla',fontSize: 10, width: 240,},
							{text: 'MOBILE: +94712197222',fontSize: 10, width:110},
							{text: 'EMAIL: dev.madawa@gmail.com',fontSize: 10,width: 150}
					    ]
	    	},
	    	{
	    	   columns: [
	    	                {text:"LINKEDIN", link:"http://www.google.com", decoration:"underline", fontSize:10,width:50},
							{text:"BLOG", link:"http://www.google.com", decoration:"underline", fontSize:10}
					    ]
	    	},
	    	{canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595-2*40, y2: 5, lineWidth: 2 }]},
			{
			margin: [0, 10],
			alignment: 'justify',
			columns: [
				[
				    {text:'EXPIRIENCE',fontSize: 12},
				    {text:'skdbf,hsbd,jfgkldfhgbkjdbkvbdfkvbkdbfvkjbj,fbxjdfbkcjhvb hjdxkjdf',fontSize: 10},
				    {
				     ul: [
            				'item 1',
            				'item 2',
            				'item 3'
            			]   
				    }
				],
				[
				    'PROJECTS',
				    {
				     ul: [
            				'item 1',
            				'item 2',
            				'item 3'
            			]   
				    }
				]
			]
		}
	],
	styles: {
		header: {
			fontSize: 31,
			bold: true,
		},
		bigger: {
			fontSize: 15,
			italics: true
		}
	},
	defaultStyle: {
		columnGap: 10
	}
	
}