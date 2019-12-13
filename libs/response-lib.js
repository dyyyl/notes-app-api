import buildResponse from '../helpers/buildResponse';

export const success = body => buildResponse(200, body);

export const failure = body => buildResponse(500, body);
