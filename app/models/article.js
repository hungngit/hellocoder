var mongoose = require("mongoose");

var ArticleSchema = mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	Title: {
		type: String,
		index: true
	},
	Content: String,
	ContentHtml: String,
	Status: {
		Id : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'ArticleStatus'
		},
	    CreatedBy: {
	        type: mongoose.Schema.Types.ObjectId,
	        ref: 'User'
	    }
	},
	Comments: [{
        Content: String,
        CreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
	AverageVote: Number,
	Votes: [{
        Star: Number,
        CreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
	Tags: [{
        Tag: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    }],
	Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    SeriesId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
	ApprovedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	History : {
		CreatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		CreatedDate: {
			type: Date,
			index: true,
			default: Date.now()
		},
		UpdatedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		UpdatedDate: {
			type: Date,
			index: true,
			default: Date.now()
		}
	},
	IsDeleted: {
		type: Boolean,
		default: false
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;