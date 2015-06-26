//client-side modifications are denied since we removed the 'insecure' package; so permissions need be granted to userId for doc modifications

ownsDocument = function(userId, doc){
			return doc && doc.userId === userId;
		}; //returns a boolean true if ownsDoc

