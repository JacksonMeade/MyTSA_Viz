const form = document.querySelector('#organization-form');
const logout = document.querySelector('#logout');
var userSignedIn = false;

var userState;

function loadInfo(doc) {
	var role = doc.data().role;
	userState = doc.data().state + "";

	$("#first_name").html(doc.data().first_name);
	$("#last_name").html(doc.data().last_name);
	$("#email").html(auth.currentUser.email);
	$("#role").html("Role: " + role);
	$("#state").html("State: " + userState);
	document.getElementById("approved").innerHTML = "Approved: " + doc.data().approved;

	if (role != "competitor") {
		var approvalRequests = document.createElement("div");
		$(approvalRequests).attr("id", "approval-requests");

		$("#approval-section").append($(approvalRequests));

		var organizations = doc.data().organizations;

		for (var i=0;i<organizations.length;i++) {
			getApprovalRequests(role, organizations[i], i);
		}
	}

	if (role == "organization_manager") {
		$("#show-form").css("visibility", "visible");
	}
}

function getApprovalRequests(role, org, i) {
	var lowerRank = "";

	if (role == "organization_manager") {
		lowerRank = "state_delegation_advisor";
	} else if (role == "state_delegation_advisor") {
		lowerRank = "chapter_advisor";
	} else if (role == "chapter_advisor") {
		lowerRank = "competitor";
	}

	db.collection('Users').where("role", "==", lowerRank).get().then(snapshot => {
		snapshot.docs.forEach(doc => {

			if (doc.data().approved != false || doc.data().rejected != false || doc.data().organizations[i] != org) {
				return;
			}

			if (doc.data().state != userState && userState != "national") {
				return;
			}

			var userInfo = doc.data().first_name + " " + doc.data().last_name + " " + doc.data().state + " " + doc.data().organizations[i];

			var requestElement = document.createElement("div");
			$(requestElement).addClass("approval-request");
			$(requestElement).attr("request-id", doc.id);

			var info = document.createElement("div");
			$(info).addClass("approval-request-info");
			$(info).html(userInfo);

			var approveButton = document.createElement("button");
			var rejectButton = document.createElement("button");

			$(approveButton).html("Approve");
			$(rejectButton).html("Reject");

			$(requestElement).append($(info));
			$(requestElement).append($(approveButton));
			$(requestElement).append($(rejectButton));

			$("#approval-requests").append($(requestElement));

			$(approveButton).click(function() {
				db.collection('Users').doc($(this).parent().attr("request-id")).update({
					approved: true
				});
			});

			$(rejectButton).click(function() {
				db.collection('Users').doc($(this).parent().attr("request-id")).update({
					rejected: true
				});
			});

		});
	});
}

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		if (!userSignedIn) {
			var uid = user.uid;

			db.collection('Users').where("uid", "==", "" + uid).get().then(snapshot =>
				 {
				snapshot.docs.forEach(doc => {
					loadInfo(doc);
				});
			});

			userSignedIn = true;
		}
	} else {
	  console.log("No user logged in");
	}
});

$(function() {
	$("#show-form").css("visibility", "hidden");
	$("#organization-form").css("visibility", "hidden");

	$("#show-form").click(function() {
		$("#organization-form").css("visibility", "visible");
	});
});

logout.addEventListener('click', (e) => {
	e.preventDefault();

	auth.signOut().then(function() {
		console.log('User Logged Out!');
		window.location.replace("../login_signup/login.html");
	}).catch(function(error) {
		console.log(error);
	});
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	var abbreviation = form['abbreviation'].value;

	db.collection('Organizations').add({
		name: form['name'].value,
		abbreviation: abbreviation,
		description: form['description'].value,
		archived_info: [],
		owners: [ auth.currentUser.uid ]
	}).then(() => {
		db.collection('Users').where("uid", "==", auth.currentUser.uid).get().then(snapshot => {
			snapshot.docs.forEach(doc => {
				db.collection('Users').doc(doc.id).update({
					organizations: firebase.firestore.FieldValue.arrayUnion(abbreviation)
				}).then(() => {
					db.collection('Users').doc(doc.id).update({
						organizations: firebase.firestore.FieldValue.arrayRemove("")
					}).then(() => {
						document.location.reload(true);
						$("#organization-form").css("visibility", "hidden");
						form.reset();
					});
				});;
			});
		});
	});

});
