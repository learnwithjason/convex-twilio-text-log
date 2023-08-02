# Text-To-Post App Using Convex HTTP Actions, Twilio, and Clerk

Convex HTTP actions allow you to create URL endpoints that directly interact with your Convex database. In this app, you'll learn how to build a React + TypeScript app that allows a user to register for an account with their phone number using Clerk, then send text and images via SMS to a Twilio number that sends incoming messages to a Convex-powered webhook to validate and store the data.

In this tutorial, you'll learn:

- How to set up a Convex database and schema with end-to-end type safety
- How to integrate Convex with Clerk for user authenticated database interaction
- How to create HTTP actions that can be used as webhooks
- How to handle incoming SMS messages to a Twilio number using a Convex-powered webhook

The concepts covered in this tutorial are transferrable to any third-party APIs that register webhooks. You'll be able to integrate just about anything with your app once you understand how HTTP actions work.

> **Thanks to Convex for sponsoring this build!** [I partner with companies to create tutorials](https://lwj.dev/partners) like these — their support keeps these tutorials free for everyone.

## Resources and further reading

- [Learn how to build this app (video + written tutorial)](https://lwj.dev/convex-actions)
- [Learn more about Convex](https://lwj.dev/convex)
- [Convex HTTP actions](https://docs.convex.dev/functions/http-actions)
- [Clerk integration with Convex](https://docs.convex.dev/auth/clerk)
- [Validating Twilio webhooks](https://www.twilio.com/docs/usage/webhooks/webhooks-security)
